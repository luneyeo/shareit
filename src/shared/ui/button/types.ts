export type ButtonTheme = "primary" | "secondary" | "danger";
export type ButtonSize = "lg" | "md" | "sm";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  theme?: ButtonTheme;
  size?: ButtonSize;
  /** 로딩 중이면 스피너를 표시하고 버튼을 비활성화합니다. (기본값: false) */
  loading?: boolean;
};
