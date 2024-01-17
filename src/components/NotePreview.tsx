import { ComponentProps } from "react";
import { NoteInfo } from "@/models";
import { cn, formatDateFromMs } from "@/utils";

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
        "cursor-pointer px-2.5 py-0.5 my-2 rounded-md transition-colors duration-75",
        {
          // "bg-purple-400/50": isActive,
          // "hover:bg-purple-500/75 border-2 border-purple-500/25": !isActive,
          "bg-zinc-400/75": isActive,
          "hover:bg-zinc-500/75 border-2 border-zinc-500/25": !isActive,
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
