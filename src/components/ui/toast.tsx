export type ToastActionElement = unknown;

export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  action?: ToastActionElement;
};

export {};
