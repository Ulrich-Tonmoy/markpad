import { LuFolderSearch } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from "@/components";
import { useEffect } from "react";
import { useConfig } from "@/libs";

export const OpenFolderButton = ({ ...props }: ActionButtonProps) => {
  const { openNotes, loadNotes } = useConfig();

  const openFolder = () => {
    openNotes();
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <ActionButton onClick={openFolder} {...props} title="Open Folder">
      <LuFolderSearch className="size-4" />
    </ActionButton>
  );
};
