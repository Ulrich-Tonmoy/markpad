import { LuFolderSearch } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from ".";
import { open } from "@tauri-apps/api/dialog";
import { readDirectory } from "../../utils/fs";
import { setNotesAtom } from "../../store";
import { useSetAtom } from "jotai";

export const OpenFolderButton = ({ ...props }: ActionButtonProps) => {
  const setNotes = useSetAtom(setNotesAtom);

  const openFolder = async () => {
    const selected = await open({
      directory: true,
    });
    if (!selected) return;
    readDirectory(selected + "\\").then((files) => {
      setNotes(files, selected + "\\");
    });
  };

  return (
    <ActionButton onClick={openFolder} {...props} title="Open Folder">
      <LuFolderSearch className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};
