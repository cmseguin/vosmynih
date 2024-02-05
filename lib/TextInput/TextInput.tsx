import "./TextInput.scss";
import { cn } from "../common/utils/jsx";

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  appearance?: "primary";
  variant?: "filled";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const TextInput = (props: TextInputProps) => {
  const {
    className,
    appearance = "primary",
    variant = "filled",
    size = "md",
    ...rest
  } = props;

  return (
    <input
      className={cn(className, {
        "appearance-primary": appearance === "primary",
        "variant-filled": variant === "filled",
        "size-xs": size === "xs",
        "size-sm": size === "sm",
        "size-md": size === "md",
        "size-lg": size === "lg",
        "size-xl": size === "xl",
      })}
      {...rest}
    />
  );
};
