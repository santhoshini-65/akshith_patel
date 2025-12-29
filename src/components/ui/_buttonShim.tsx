import type { FC } from "react";

// Accept arbitrary props used by the app (variant, size, className, etc.)
export const Button: FC<any> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export default Button;