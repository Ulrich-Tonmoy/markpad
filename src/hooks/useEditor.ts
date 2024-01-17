import { useAtomValue, useSetAtom } from "jotai";
import { saveNoteAtom, selectedNoteAtom } from "@/store";
import { useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { NoteContent } from "@/models";
import { AUTO_SAVING_TIME } from "@/libs";
import { throttle } from "lodash";

export const useEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const saveNote = useSetAtom(saveNoteAtom);
  const editorRef = useRef<MDXEditorMethods>(null);

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return;

      console.info("Auto saving:", selectedNote.title);

      await saveNote(content);
    },
    AUTO_SAVING_TIME,
    {
      leading: false,
      trailing: true,
    },
  );

  const handleBlur = async () => {
    if (!selectedNote) return;

    handleAutoSaving.cancel();

    const content = editorRef.current?.getMarkdown();

    if (content != null) {
      await saveNote(content);
    }
  };

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur,
  };
};
