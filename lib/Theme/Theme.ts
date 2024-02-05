import Color from "color";

export type ThemeDictionary = {
  [themeKey: string]: Theme;
};

export type TokenValue = string | number | Color;
export type TokenDictionary = {
  [tokenKey: string]: TokenValue;
};

export type MediaQueryDictionary = {
  [mediaQuery: string]: TokenDictionary;
};

/**
 * A computed theme is a theme that has been processed by the theme engine.
 */
export type ComputedTheme = TokenDictionary;

type MediaQueryMap = Map<
  string,
  {
    query: string;
    tokens: TokenDictionary;
    mediaQuery: MediaQueryList;
  }
>;

type EventListenersFunction = (computedTheme: ComputedTheme) => void;
type UnregisterFunction = () => void;
type EventListenersKey = "change" | "activate" | "deactivate";

export class Theme {
  protected computed: ComputedTheme = {};
  protected mediaQueryListeners: UnregisterFunction[] = [];
  protected eventListenersMap: Map<string, EventListenersFunction[]> =
    new Map();
  protected isActive: boolean = false;
  protected mediaQueryMap: MediaQueryMap = new Map();

  constructor(
    protected key: string,
    protected global: TokenDictionary = {},
    media: MediaQueryDictionary = {},
  ) {
    this.setMediaQueryMap(media);
  }

  public getKey(): string {
    return this.key;
  }

  public getToken(key: string): TokenValue {
    return this.computed[key];
  }

  public activate(): void {
    this.emitEvent("activate");
    this.isActive = true;
    this.mutateComputedTheme(this.global);
    this.registerMediaQueryListeners();
  }

  public deactivate(): void {
    this.emitEvent("deactivate");
    this.isActive = false;
    this.removeAllEventListeners();
    this.unregisterMediaQueryListeners();
  }

  public getComputedTheme(): ComputedTheme {
    return this.computed;
  }

  public addEventListener(
    eventKey: EventListenersKey,
    callback: EventListenersFunction,
  ): void {
    const listeners = this.eventListenersMap.get(eventKey) ?? [];
    listeners.push(callback);
    this.eventListenersMap.set(eventKey, listeners);
  }

  public removeEventListener(
    eventKey: EventListenersKey,
    callback: EventListenersFunction,
  ): void {
    const listeners = this.eventListenersMap.get(eventKey) ?? [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  protected removeAllEventListeners(): void {
    this.eventListenersMap.clear();
  }

  protected emitEvent(eventKey: EventListenersKey): void {
    const listeners = this.eventListenersMap.get(eventKey) ?? [];
    listeners.forEach((listener) => listener(this.computed));
  }

  protected registerMediaQueryListeners(): void {
    this.mediaQueryMap.forEach(({ mediaQuery, tokens }) => {
      const handler = (e: MediaQueryListEvent) => {
        this.onMediaQueryChange(tokens, e.matches);
      };
      this.onMediaQueryChange(tokens, mediaQuery.matches);
      mediaQuery.addEventListener("change", handler);
      this.mediaQueryListeners.push(() =>
        mediaQuery.removeEventListener("change", handler),
      );
    });
  }

  protected unregisterMediaQueryListeners(): void {
    this.mediaQueryListeners.forEach((listener) => listener());
  }

  /**
   * Builds the media query map from the media query dictionary.
   * @param media the media query dictionary to set
   */
  protected setMediaQueryMap(media: MediaQueryDictionary): void {
    Object.entries(media).forEach(([query, tokens]) => {
      this.mediaQueryMap.set(query, {
        query,
        tokens,
        mediaQuery: window.matchMedia(query),
      });
    });
  }

  protected mutateComputedTheme(tokens: TokenDictionary) {
    let changed = false;
    if (!tokens) return;
    Object.keys(tokens).forEach((key) => {
      const value = tokens[key];
      if (!value) return;
      const stringValue = typeof value === "string" ? value : value.toString();
      if (this.computed[key] === stringValue) return;
      changed = true;
      this.computed[key] = stringValue;
    });

    if (changed) {
      this.emitEvent("change");
    }
  }

  protected resetTokens(token: TokenDictionary) {
    let changed = false;
    Object.keys(token).forEach((key) => {
      if (this.computed[key] !== this.global[key]) {
        changed = true;
      }
      this.computed[key] = this.global[key];
    });
    if (changed) {
      this.emitEvent("change");
    }
  }

  protected onMediaQueryChange = (
    tokens: TokenDictionary,
    matches: boolean,
  ) => {
    if (!tokens) return;

    if (matches) {
      return this.mutateComputedTheme(tokens);
    }

    let found = false;

    this.mediaQueryMap.forEach(({ mediaQuery, tokens }) => {
      if (mediaQuery.matches) {
        this.mutateComputedTheme(tokens);
        found = true;
      }
    });

    if (!found) {
      this.resetTokens(tokens);
    }
  };
}
