import "./UiProvider.scss";

import Color from "color";
import { FC, PropsWithChildren, createContext, useContext } from "react";
import { defaultTheme } from "../themes/default";
import { useTheme } from "../Theme/useTheme";
import type { Theme } from "../Theme/Theme";

interface UiContextProps {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
  getThemeToken: (tokenKey: string) => string | number | Color | undefined;
}
const UiContext = createContext<UiContextProps>({
  theme: undefined,
  setTheme: () => {},
  resetTheme: () => {},
  getThemeToken: () => "",
});

interface PrivateUiContextProps {}
const __PrivateUiContext = createContext<PrivateUiContextProps>({});

interface UiProviderProps {
  themeStorageKey?: string;
  defaultThemeKey?: string;
  themes?: Theme[];
}
export const UiProvider: FC<PropsWithChildren<UiProviderProps>> = ({
  children,
  defaultThemeKey,
  themeStorageKey = "theme",
  themes = [defaultTheme],
}) => {
  const { theme, setTheme, resetTheme, getThemeToken } = useTheme(
    themes,
    themeStorageKey,
    defaultThemeKey,
  );
  return (
    <__PrivateUiContext.Provider value={{}}>
      <UiContext.Provider
        value={{
          theme,
          setTheme,
          resetTheme,
          getThemeToken,
        }}
      >
        {children}
      </UiContext.Provider>
    </__PrivateUiContext.Provider>
  );
};

export const useUI = () => {
  return useContext(UiContext);
};
