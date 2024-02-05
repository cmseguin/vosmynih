import { Theme, TokenDictionary, TokenValue } from "./Theme";
import { useCallback, useEffect, useMemo } from "react";
import { useHistoricalState } from "../common/hooks/useHistoricalState";

const addTokensToDom = (tokens: TokenDictionary) => {
  Object.keys(tokens).forEach((key) => {
    const value = tokens[key];
    if (!value) return;
    const stringValue = typeof value === "string" ? value : value.toString();
    document.documentElement.style.setProperty(`--${key}`, stringValue);
  });
};

export const useTheme = (
  themes: Theme[],
  themeStorageKey: string,
  defaultThemeKey?: string,
) => {
  const {
    state: currentTheme,
    setState: setTheme,
    previousState: previousTheme,
  } = useHistoricalState<Theme | undefined>(undefined);
  const themesKeys = useMemo(
    () => themes.map((theme) => theme.getKey()),
    [themes],
  );
  const themesKeyString = useMemo(() => themesKeys.join(","), [themesKeys]);

  const themesMap = useMemo(() => {
    return new Map(themes.map((theme) => [theme.getKey(), theme]));
    // Need to disable this rule because we want to compare the keys to tell us if the themes have changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themesKeyString]);

  const getThemeToken = useCallback(
    (tokenKey: string): TokenValue | undefined =>
      currentTheme?.getToken(tokenKey),
    [currentTheme],
  );

  const setThemeWithLocalStorage = useCallback(
    (theme: Theme) => {
      localStorage.setItem(themeStorageKey, theme.getKey());
      setTheme(theme);
    },
    [setTheme, themeStorageKey],
  );

  const resetThemeToDefault = useCallback(() => {
    localStorage.removeItem(themeStorageKey);
    setTheme(themesMap.get(defaultThemeKey ?? themesMap.keys().next().value));
  }, [defaultThemeKey, setTheme, themeStorageKey, themesMap]);

  useEffect(() => {
    if (!currentTheme) return;
    if (currentTheme === previousTheme) return;

    if (previousTheme) {
      previousTheme?.deactivate();
    }

    currentTheme.activate();
    currentTheme.addEventListener("change", () => {
      addTokensToDom(currentTheme.getComputedTheme());
    });
    addTokensToDom(currentTheme.getComputedTheme());
  }, [currentTheme, previousTheme]);

  // Set the theme on first load
  useEffect(() => {
    const storedThemeKey = localStorage.getItem(themeStorageKey);
    if (storedThemeKey && !themesMap.has(storedThemeKey)) {
      resetThemeToDefault();
      return;
    }
    const themeKey =
      storedThemeKey ?? defaultThemeKey ?? themesMap.keys().next().value;
    setTheme(themesMap.get(themeKey));
  }, [
    defaultThemeKey,
    resetThemeToDefault,
    setTheme,
    themeStorageKey,
    themesMap,
  ]);

  return {
    getThemeToken,
    setTheme: setThemeWithLocalStorage,
    resetTheme: resetThemeToDefault,
    theme: currentTheme,
  };
};
