import { ExternalToast, toast as shadcnToast, Toaster as Sonner } from "sonner";
import { ComponentProps } from "react";

type ToasterProps = ComponentProps<typeof Sonner>;

type ToastType = "error" | "info" | "warning" | "success" | "loading";

export function fireToast(
  type: ToastType,
  message?: string,
  props?: ToasterProps | ExternalToast,
) {
  return shadcnToast[type](message, {
    position: "top-right",
    duration: 1500,
    ...props,
  });
}
