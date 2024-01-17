import { atom } from "jotai";
import { NoteContent, NoteInfo, Obsidian } from "@/models";
import { dataDir } from "@tauri-apps/api/path";
import { CONFIG_FILE_NAME, readDirectory, readFile, writeFile } from "@/libs";
import { unwrap } from "jotai/utils";

const dataDirPath = (await dataDir()) + CONFIG_FILE_NAME;
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

  if (!selectedNote || !notes) return;

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
