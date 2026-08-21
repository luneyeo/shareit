export type ButtonTheme = "primary" | "secondary";
export type ButtonSize = "lg" | "md" | "sm";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  theme?: ButtonTheme;
  size?: ButtonSize;
};
