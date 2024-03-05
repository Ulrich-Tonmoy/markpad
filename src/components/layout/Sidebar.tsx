import { configAtom } from "@/store";
import { useAtomValue } from "jotai";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Sidebar = ({ className, children, ...props }: ComponentProps<"aside">) => {
  const config = useAtomValue(configAtom);

  if (!config.showSidebar) return;

  return (
    <aside className={twMerge("md:w-52 w-44 mt-7", className)} {...props}>
      {children}
    </aside>
  );
};
