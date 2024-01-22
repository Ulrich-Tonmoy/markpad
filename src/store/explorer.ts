import { atom } from "jotai";
import { NoteContent, NoteInfo, ObsidianConfig } from "@/models";
import { dataDir } from "@tauri-apps/api/path";
import {
  CONFIG_FILE_NAME,
  View,
  deleteFile,
  readDirectory,
  readFile,
  setTheme,
  writeFile,
} from "@/libs";
import { unwrap } from "jotai/utils";
import { ask, open, save } from "@tauri-apps/api/dialog";
import { basename } from "@tauri-apps/api/path";

const dataDirPath = async () => {
  return (await dataDir()) + CONFIG_FILE_NAME;
};

export const openedFolderPathAtom = atom<string>("");
export const notesAtom = atom<NoteInfo[] | null>(null);
export const selectedNoteIndexAtom = atom<number | null>(null);
export const viewAtom = atom<View>(View.Editor);
export const configAtom = atom<ObsidianConfig>({
  lastOpenedDir: "",
  theme: "",
});

export const updateThemeAtom = atom(null, async (get, set, theme: string) => {
  const dirPath = await dataDirPath();
  const config = get(configAtom);
  config.theme = theme;
  writeFile(dirPath, JSON.stringify(config));
  set(configAtom, config);
});

export const updateViewAtom = atom(null, async (_, set, view: View) => {
  set(viewAtom, view);
  if (view === View.Settings) set(selectedNoteIndexAtom, null);
});

export const loadNotesAtom = atom(null, async (_, set) => {
  const dirPath = await dataDirPath();
  readFile(dirPath).then((res: string) => {
    if (res !== "ERROR") {
      const config: ObsidianConfig = JSON.parse(res);
      set(configAtom, config);
      setTheme(config.theme ?? "");

      readDirectory(config.lastOpenedDir).then((files) => {
        set(openedFolderPathAtom, config.lastOpenedDir);

        if (!files.length) return;
        const sortedNotes = files.sort(
          (a: NoteInfo, b: NoteInfo) => b.lastEditTime - a.lastEditTime,
        );
        set(notesAtom, sortedNotes);
      });
    }
  });
});

export const openNotesAtom = atom(null, async (get, set) => {
  const selected = await open({
    directory: true,
  });
  if (!selected) return;

  const fullPath = selected + "\\";
  const dirPath = await dataDirPath();
  const obsidian = get(configAtom);

  readDirectory(fullPath).then((files) => {
    obsidian.lastOpenedDir = fullPath;
    writeFile(dirPath, JSON.stringify(obsidian));

    const sortedNotes = files.sort(
      (a: NoteInfo, b: NoteInfo) => b.lastEditTime - a.lastEditTime,
    );
    set(openedFolderPathAtom, fullPath);
    set(notesAtom, sortedNotes);
  });
});

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom);
  const selectedNoteIndex = get(selectedNoteIndexAtom);

  if (selectedNoteIndex == null || !notes) return null;

  const selectedNote = notes[selectedNoteIndex];

  const noteContent = await readFile(selectedNote.path);

  return {
    ...selectedNote,
    content: noteContent,
  };
});

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: "",
      path: "",
      content: "",
      lastEditTime: Date.now(),
    },
);

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote || !notes?.length) return;

  await writeFile(selectedNote.path, newContent);

  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now(),
        };
      }

      return note;
    }),
  );
});

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom) ?? [];
  const path = get(openedFolderPathAtom);

  const newFile = await save({
    title: "Create a new File",
    defaultPath: path + "Untitled.md",
    filters: [
      {
        name: "Obsidian File",
        extensions: ["md"],
      },
    ],
  });

  if (!newFile) return;

  const title = (await basename(newFile)).split(".")[0];

  await writeFile(newFile, "");

  const newNote: NoteInfo = {
    title,
    path: newFile,
    lastEditTime: Date.now(),
  };

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)]);
  set(selectedNoteIndexAtom, 0);
});

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote || !notes?.length) return;

  const confirmed = await ask(
    `Are you sure you want to delete ${selectedNote.title}.md?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete ${selectedNote.title}.md`,
      type: "warning",
    },
  );

  if (!confirmed) return;

  const isDeleted = deleteFile(selectedNote.path);
  if (!isDeleted) return;

  // await message(`${selectedNote.title}.md have been delete successfully.`, {
  //   title: "Ok",
  //   type: "info",
  // });

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title),
  );

  set(selectedNoteIndexAtom, null);
});
