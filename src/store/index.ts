import { atom } from "jotai";
import { NoteInfo, Obsidian } from "../models";
import { dataDir } from "@tauri-apps/api/path";
import { readDirectory, readFile, writeFile } from "../utils/fs";

const dataDirPath = (await dataDir()) + `Obsidian\\obsidian.json`;
const openedFolderPath = atom<string>("");
export const notesAtom = atom<NoteInfo[] | null>(null);
export const selectedNoteIndexAtom = atom<number | null>(null);

export const loadNotesAtom = atom(null, async (_, set) => {
  readFile(dataDirPath).then((res: string) => {
    if (res !== "ERROR") {
      const obsidian: Obsidian = JSON.parse(res);

      readDirectory(obsidian.lastOpenedDir).then((files) => {
        const sortedNotes = files.sort(
          (a: NoteInfo, b: NoteInfo) => b.lastEditTime - a.lastEditTime,
        );
        set(openedFolderPath, obsidian.lastOpenedDir);
        set(notesAtom, sortedNotes);
      });
    }
  });
});

export const setNotesAtom = atom(null, async (_, set, dirPath: string) => {
  const fullPath = dirPath + "\\";

  readDirectory(fullPath).then((files) => {
    const data = { lastOpenedDir: fullPath };
    writeFile(dataDirPath, JSON.stringify(data));

    const sortedNotes = files.sort(
      (a: NoteInfo, b: NoteInfo) => b.lastEditTime - a.lastEditTime,
    );
    set(openedFolderPath, fullPath);
    set(notesAtom, sortedNotes);
  });
});

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom);
  const selectedNoteIndex = get(selectedNoteIndexAtom);

  if (selectedNoteIndex == null || !notes) return null;

  const selectedNote = notes[selectedNoteIndex];

  return {
    ...selectedNote,
    content: `# Selected Note Index ${selectedNoteIndex}`,
  };
});

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom);

  if (!notes) return;

  const title = `Untitled ${notes.length + 1}`;

  const newNote: NoteInfo = {
    title,
    path: "",
    lastEditTime: Date.now(),
  };

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)]);
  set(selectedNoteIndexAtom, 0);
});

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote || !notes) return;

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title),
  );

  set(selectedNoteIndexAtom, null);
});
