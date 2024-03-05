import { atom } from "jotai";
import { dataDir } from "@tauri-apps/api/path";
import {
  CONFIG_FILE_NAME,
  DEFAULT_FILE_NAME,
  DIALOG_FILTERS,
  ViewState,
  WELCOME_CONTENT,
  deleteFile,
  readDirectory,
  readFile,
  setTheme,
  writeFile,
  NoteContent,
  NoteInfo,
  MarkpadConfig,
  configAtom,
  updateRecentFolders,
  viewAtom,
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

export const loadNotesAtom = atom(null, async (_, set) => {
  const dirPath = await dataDirPath();
  readFile(dirPath).then((res: string) => {
    if (res !== "ERROR") {
      let config: MarkpadConfig = JSON.parse(res);
      config = {
        lastOpenedDir: config.lastOpenedDir ?? null,
        theme: config.theme ?? "",
        welcomeContent: config.welcomeContent ?? true,
        showSidebar: config.showSidebar ?? true,
        openFirstFile: config.openFirstFile ?? false,
        showEditorToolbar: config.showEditorToolbar ?? true,
        keepWindowMaximized: config.keepWindowMaximized ?? false,
        isFullscreen: config.keepWindowMaximized ? config.isFullscreen : false,
      };
      set(configAtom, config);
      setTheme(config.theme ?? "");

      if (!config.lastOpenedDir) return;

      readDirectory(config.lastOpenedDir).then((files) => {
        set(openedFolderPathAtom, config.lastOpenedDir);

        if (!files.length) return;
        const sortedNotes = files.sort(
          (a: NoteInfo, b: NoteInfo) => b.lastEditTime - a.lastEditTime,
        );
        set(notesAtom, sortedNotes);
        if (config.openFirstFile) {
          set(selectedNoteIndexAtom, 0);
          set(viewAtom, ViewState.Editor);
        }
      });
    }
  });
});

export const openNotesAtom = atom(null, async (get, set) => {
  set(selectedNoteIndexAtom, null);
  const selected = await open({
    directory: true,
  });
  if (!selected) return;

  const fullPath = selected + "\\";
  const dirPath = await dataDirPath();
  const markpad = get(configAtom);

  const title = await basename(selected.toString());

  readDirectory(fullPath).then((files) => {
    markpad.lastOpenedDir = fullPath;
    set(configAtom, markpad);
    writeFile(dirPath, JSON.stringify(markpad));

    const sortedNotes = files.sort(
      (a: NoteInfo, b: NoteInfo) => b.lastEditTime - a.lastEditTime,
    );
    set(openedFolderPathAtom, fullPath);
    set(notesAtom, sortedNotes);
  });
  updateRecentFolders(set, { title, path: fullPath, lastOpenTime: new Date().getTime() });
});

export const openNotesUsingPathAtom = atom(null, async (get, set, path: string) => {
  const dirPath = await dataDirPath();
  const markpad = get(configAtom);

  const title = await basename(path);

  readDirectory(path).then((files) => {
    markpad.lastOpenedDir = path;
    set(configAtom, markpad);
    writeFile(dirPath, JSON.stringify(markpad));

    const sortedNotes = files.sort(
      (a: NoteInfo, b: NoteInfo) => b.lastEditTime - a.lastEditTime,
    );
    set(openedFolderPathAtom, path);
    set(notesAtom, sortedNotes);
  });
  updateRecentFolders(set, { title, path: path, lastOpenTime: new Date().getTime() });
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

  let counter = 0;
  let name = DEFAULT_FILE_NAME;

  while (notes.some((note) => note.title.startsWith(name))) {
    counter++;
    name = DEFAULT_FILE_NAME + (counter > 0 ? counter : "");
  }

  const newFile = await save({
    title: "Create a new File",
    defaultPath: path + name,
    filters: DIALOG_FILTERS,
  });

  if (!newFile) return;

  const title = (await basename(newFile)).split(".")[0];

  const config = get(configAtom);
  if (config.welcomeContent) await writeFile(newFile, WELCOME_CONTENT);
  else await writeFile(newFile, `# ${title}`);

  const newNote: NoteInfo = {
    title,
    path: newFile,
    lastEditTime: Date.now(),
  };

  set(viewAtom, ViewState.Editor);
  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)]);
  set(selectedNoteIndexAtom, 0);
});

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote || !notes?.length) return;

  const fileName = await basename(selectedNote.path);

  const confirmed = await ask(
    `Are you sure you want to delete ${fileName}?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete ${fileName}?`,
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
