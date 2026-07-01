declare module "*.svg" {
  import type { SVGProps } from "react";

  const SvgComponent: React.FC<SVGProps<SVGSVGElement>>;
  export default SvgComponent;
}
