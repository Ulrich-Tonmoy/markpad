import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  notesAtom,
  openedFolderPathAtom,
  selectedNoteIndexAtom,
  updateViewAtom,
} from "@/store";
import { View } from "@/libs";

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const updateView = useSetAtom(updateViewAtom);
  const notes = useAtomValue(notesAtom);
  const openedFolderPath = useAtomValue(openedFolderPathAtom);
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom);

  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index);
    updateView(View.Editor);

    if (onSelect) {
      onSelect();
    }
  };

  return {
    notes,
    openedFolderPath,
    selectedNoteIndex,
    handleNoteSelect,
  };
};
