import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Sidebar = ({ className, children, ...props }: ComponentProps<"aside">) => {
  return (
    <aside className={twMerge("w-[250px] mt-7 overflow-auto", className)} {...props}>
      {children}
    </aside>
  );
};
