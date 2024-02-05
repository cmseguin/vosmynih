import { useEffect, useMemo, useState } from "react";

export const useSystemColorScheme = () => {
  const colorSchemeQuery = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)"),
    [],
  );
  const [colorScheme, setColorScheme] = useState<"dark" | "light">(
    colorSchemeQuery.matches ? "dark" : "light",
  );

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? "dark" : "light");
    };

    colorSchemeQuery.addEventListener("change", handler);

    return () => {
      colorSchemeQuery.removeEventListener("change", handler);
    };
  }, [colorSchemeQuery]);

  return colorScheme;
};
