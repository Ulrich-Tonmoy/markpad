import { RECENT_FOLDER_LIST_FILE_NAME, RecentFolder, readFile, writeFile } from "@/libs";
import { dataDir } from "@tauri-apps/api/path";
import { atom } from "jotai";
import { Setter } from "jotai/vanilla";

const dataDirPath = async () => {
  return (await dataDir()) + RECENT_FOLDER_LIST_FILE_NAME;
};

export const recentFoldersAtom = atom<RecentFolder[]>([]);

export const updateRecentFoldersAtom = atom(
  null,
  async (_get, set, recent: RecentFolder) => {
    updateRecentFolders(set, recent);
  },
);

export const clearRecentFoldersAtom = atom(null, async (_get, set) => {
  const dirPath = await dataDirPath();
  let recentFolders: RecentFolder[] = [];

  set(recentFoldersAtom, []);
  writeFile(dirPath, JSON.stringify(recentFolders));
});

export const loadRecentFoldersAtom = atom(null, async (_, set) => {
  const dirPath = await dataDirPath();
  readFile(dirPath).then((res: string) => {
    if (res !== "ERROR") {
      let recent: RecentFolder[] = JSON.parse(res);
      const sortedRecent = recent.sort(
        (a: RecentFolder, b: RecentFolder) => b.lastOpenTime - a.lastOpenTime,
      );
      set(recentFoldersAtom, sortedRecent);
    }
  });
});

export const updateRecentFolders = async (set: Setter, recent: RecentFolder) => {
  const dirPath = await dataDirPath();
  let recentFolders: RecentFolder[] = [];
  readFile(dirPath).then((res: string) => {
    if (res !== "ERROR") {
      recentFolders = JSON.parse(res);
    }

    const index = recentFolders.findIndex((folder) => folder.path === recent.path);
    if (index !== -1) {
      recentFolders[index] = recent;
    } else {
      recentFolders.push(recent);
    }

    set(recentFoldersAtom, recentFolders);
    writeFile(dirPath, JSON.stringify(recentFolders));
  });
};
