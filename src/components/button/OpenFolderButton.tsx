import { LuFolderSearch } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from ".";
import { open } from "@tauri-apps/api/dialog";
import { loadNotesAtom, setNotesAtom } from "../../store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export const OpenFolderButton = ({ ...props }: ActionButtonProps) => {
  const setNotes = useSetAtom(setNotesAtom);
  const loadNotes = useSetAtom(loadNotesAtom);

  const openFolder = async () => {
    const selected = await open({
      directory: true,
    });
    if (!selected) return;
    setNotes(selected as string);
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
