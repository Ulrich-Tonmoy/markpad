import { ComponentProps } from "react";
import { cn, formatDateFromMs, NoteInfo } from "@/libs";

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean;
} & ComponentProps<"div">;

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime);

  return (
    <div
      className={cn(
        "cursor-pointer px-2.5 py-0.5 my-2 rounded-md transition-colors duration-75 text-text",
        {
          "bg-active": isActive,
          "hover:bg-hover border-2 border-border": !isActive,
        },
        className,
      )}
      {...props}
    >
      <h3 className="mb-0.5 font-bold truncate">{title}</h3>
      <span className="inline-block w-full mb-1 text-xs font-light text-left">
        {date}
      </span>
    </div>
  );
};
