import type { SystemVariant } from "$lib/types";

export interface ToastProps {
  id: string;
  message: string;
  variant: SystemVariant;
  timeout: number;
};
