import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type ActionButtonProps = ComponentProps<"button">;

export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        "px-2 py-1 rounded-md border border-border hover:bg-hover transition-colors duration-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
