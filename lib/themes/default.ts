import Color from "color";
import { Theme } from "../Theme/Theme";

const color1 = Color("#071952");
const color2 = Color("#0B666A");

export const defaultTheme = new Theme(
  "default",
  {
    "text-input-border-width": "0.1em",
    "text-input-border-color": "#888",
    "text-input-border-style": "solid",
    "text-input-border-color-focus": color1.toString(),
    "text-input-border-radius": "1.5em",
    "text-input-font-color": "#444",

    "border-radius-card": "0.5em",
    "border-radius-button-contained": "1.5em",

    "color-button-primary": color1.toString(),
    "color-button-primary-hover": color1.lighten(0.25).toString(),
    "color-button-primary-active": color1.darken(0.25).toString(),
    "color-button-secondary": color2.toString(),
    "color-button-secondary-hover": color2.lighten(0.25).toString(),
    "color-button-secondary-active": color2.darken(0.25).toString(),

    "color-text-on-primary": "#fff",
    "color-text-on-secondary": "#fff",

    "font-family": "Arial, Helvetica Neue, Helvetica, sans-serif",
    "font-family-alt": "Century Gothic, CenturyGothic, AppleGothic, sans-serif",
    "font-size-xxl": "4rem",
    "font-size-xl": "2rem",
    "font-size-lg": "1.3rem",
    "font-size-md": "0.9rem",
    "font-size-sm": "0.8rem",
    "font-size-xs": "0.7rem",
    "spacing-xs": "0.5rem",
    "spacing-sm": "0.75rem",
    "spacing-md": "1rem",
    "spacing-lg": "2rem",
    "spacing-xl": "3rem",
    "spacing-xxl": "6rem",
  },
  {
    "(min-width: 768px)": {
      "font-size-xxl": "6rem",
      "font-size-xl": "3rem",
      "font-size-lg": "1.5rem",
      "font-size-md": "1rem",
      "font-size-sm": "0.9rem",
      "font-size-xs": "0.75rem",
    },
    "(min-width: 1400px)": {
      "font-size-xxl": "8rem",
      "font-size-xl": "4rem",
      "font-size-lg": "2rem",
      "font-size-md": "1rem",
      "font-size-sm": "0.9rem",
      "font-size-xs": "0.75rem",
    },
  },
);
