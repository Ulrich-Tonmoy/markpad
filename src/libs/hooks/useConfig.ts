import { useAtomValue, useSetAtom } from "jotai";
import {
  configAtom,
  createEmptyNoteAtom,
  deleteNoteAtom,
  loadNotesAtom,
  openNotesAtom,
  updateConfigDataAtom,
  updateViewAtom,
  viewAtom,
} from "@/store";

export const useConfig = () => {
  const config = useAtomValue(configAtom);
  const updateConfigData = useSetAtom(updateConfigDataAtom);
  const view = useAtomValue(viewAtom);
  const updateView = useSetAtom(updateViewAtom);
  const openNotes = useSetAtom(openNotesAtom);
  const loadNotes = useSetAtom(loadNotesAtom);
  const deleteNote = useSetAtom(deleteNoteAtom);
  const createEmptyNote = useSetAtom(createEmptyNoteAtom);

  return {
    config,
    updateConfigData,
    view,
    updateView,
    openNotes,
    loadNotes,
    deleteNote,
    createEmptyNote,
  };
};
