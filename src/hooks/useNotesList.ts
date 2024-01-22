import { useAtom, useAtomValue } from "jotai";
import { notesAtom, openedFolderPathAtom, selectedNoteIndexAtom } from "@/store";

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useAtomValue(notesAtom);
  const openedFolderPath = useAtomValue(openedFolderPathAtom);
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom);

  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index);

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
