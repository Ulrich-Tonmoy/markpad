import { ComponentProps, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useAtomValue, useSetAtom } from "jotai";
import {
  clearRecentFoldersAtom,
  loadRecentFoldersAtom,
  recentFoldersAtom,
} from "@/store";
import { RecentFolder } from "@/components";

export type RecentFolderListProps = ComponentProps<"ul">;

export const RecentFolderList = ({ className, ...props }: RecentFolderListProps) => {
  const recentFolders = useAtomValue(recentFoldersAtom);
  const loadRecentFolders = useSetAtom(loadRecentFoldersAtom);
  const clearRecentFolders = useSetAtom(clearRecentFoldersAtom);

  useEffect(() => {
    loadRecentFolders();
  }, []);

  if (recentFolders.length === 0) {
    return (
      <ul
        className={twMerge(
          "text-center pt-4 h-[calc(100vh-50px)] flex justify-center items-center",
          className,
        )}
        {...props}
      >
        <span className="text-3xl">No Recent folders.</span>
      </ul>
    );
  }

  const handleClearRecent = () => {
    clearRecentFolders();
  };

  return (
    <ul className={className} {...props}>
      <div className="flex justify-between">
        <h1 className="p-2 m-2 text-3xl font-bold">Recently Opened Folders {"->"}</h1>
        <button
          className="p-2 m-2 font-bold text-white bg-red-500 rounded w-max h-max hover:bg-red-700"
          onClick={() => handleClearRecent()}
        >
          Clear Recent
        </button>
      </div>
      {recentFolders.map((folder, index) => (
        <RecentFolder key={index} {...folder} />
      ))}
    </ul>
  );
};
