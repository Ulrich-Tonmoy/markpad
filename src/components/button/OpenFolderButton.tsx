import { LuFolderSearch } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from "@/components";
import { loadNotesAtom, loadRecentFoldersAtom, openNotesAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export const OpenFolderButton = ({ ...props }: ActionButtonProps) => {
  const openNotes = useSetAtom(openNotesAtom);
  const loadNotes = useSetAtom(loadNotesAtom);
  const loadRecentFolders = useSetAtom(loadRecentFoldersAtom);

  const openFolder = async () => {
    openNotes();
  };

  useEffect(() => {
    loadNotes();
    loadRecentFolders();
  }, []);

  return (
    <ActionButton onClick={openFolder} {...props} title="Open Folder">
      <LuFolderSearch className="size-4" />
    </ActionButton>
  );
};
