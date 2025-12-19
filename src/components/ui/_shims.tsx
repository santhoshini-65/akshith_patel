import type { FC, PropsWithChildren } from "react";

export const Toaster: FC = () => null;

export const SonnerToaster: FC = () => null;

export const TooltipProvider: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => (
  <>{children}</>
);
