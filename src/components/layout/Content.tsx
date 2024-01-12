import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge("flex-1 mt-7 overflow-auto", className)} {...props}>
      {children}
    </div>
  ),
);
Content.displayName = "Content";
