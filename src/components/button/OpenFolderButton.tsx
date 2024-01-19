import { LuFolderSearch } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from "@/components";
import { loadNotesAtom, openNotesAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export const OpenFolderButton = ({ ...props }: ActionButtonProps) => {
  const openNotes = useSetAtom(openNotesAtom);
  const loadNotes = useSetAtom(loadNotesAtom);

  const openFolder = async () => {
    openNotes();
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <ActionButton onClick={openFolder} {...props} title="Open Folder">
      <LuFolderSearch className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};
