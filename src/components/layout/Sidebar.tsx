import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Sidebar = ({ className, children, ...props }: ComponentProps<"aside">) => {
  return (
    <aside className={twMerge("md:w-64 w-40 mt-7", className)} {...props}>
      {children}
    </aside>
  );
};
