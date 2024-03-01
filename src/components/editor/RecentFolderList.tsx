import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { useAtomValue } from "jotai";
import { clearRecentFolders, recentFoldersAtom } from "@/store";
import { RecentFolder } from ".";

export type RecentFolderListProps = ComponentProps<"ul">;

export const RecentFolderList = ({ className, ...props }: RecentFolderListProps) => {
  const recentFolders = useAtomValue(recentFoldersAtom);

  if (recentFolders.length === 0) {
    return (
      <ul className={twMerge("text-center pt-4", className)} {...props}>
        <span>No Recent folders.</span>
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
          className="h-10 p-2 m-2 font-bold text-white bg-red-500 rounded w-30 hover:bg-red-700"
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
