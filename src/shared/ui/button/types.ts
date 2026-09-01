export type ButtonTheme = "primary" | "secondary" | "danger";
export type ButtonSize = "lg" | "md" | "sm";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  theme?: ButtonTheme;
  size?: ButtonSize;
};
