import { RecentFolder as RecentFolderType, cn, formatDateFromMs } from "@/libs";
import { openNotesUsingPathAtom } from "@/store";
import { useSetAtom } from "jotai";
import { ComponentProps } from "react";

export type RecentFolderProps = RecentFolderType & ComponentProps<"div">;

export const RecentFolder = ({
  title,
  path,
  lastOpenTime,
  className,
  ...props
}: RecentFolderProps) => {
  const openNotes = useSetAtom(openNotesUsingPathAtom);

  const formatDate = (time: number) => {
    return formatDateFromMs(time);
  };

  const handleFolderSelect = (path: string) => {
    openNotes(path);
  };

  return (
    <div
      onClick={() => handleFolderSelect(path)}
      className={cn(
        "cursor-pointer px-2.5 py-0.5 mx-4 my-2 rounded-md transition-colors duration-75 text-text hover:bg-hover border-2 border-border",
        className,
      )}
      {...props}
    >
      <div className="flex flex-row justify-between">
        <h3 className="mb-0.5 font-bold truncate">Folder Name: {title}</h3>
        <span className="mb-1 font-light text-left truncate">Folder Path: {path}</span>
      </div>
      <span className="inline-block w-full mb-1 text-xs font-light text-left">
        Last Open: {formatDate(lastOpenTime)}
      </span>
    </div>
  );
};
