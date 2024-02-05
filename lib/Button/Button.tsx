import "./Button.scss";

import { HTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { cn } from "../common/utils/jsx";

export interface ButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  type?: "button" | "submit" | "reset";
  appearance?: "primary" | "secondary" | "inherit";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Lets you control the different variant of the button.
   * @default "contained"
   */
  variant?: "contained" | "outlined" | "text" | "icon";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      type = "button",
      variant = "contained",
      appearance = "primary",
      ...props
    },
    ref,
  ) {
    return (
      <button
        className={cn(className, {
          "appearance-primary": appearance === "primary",
          "appearance-secondary": appearance === "secondary",
          "variant-contained": variant === "contained",
          "variant-outlined": variant === "outlined",
          "variant-text": variant === "text",
          "variant-icon": variant === "icon",
          "size-xs": props.size === "xs",
          "size-sm": props.size === "sm",
          "size-md": props.size === "md",
          "size-lg": props.size === "lg",
          "size-xl": props.size === "xl",
        })}
        type={type}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
