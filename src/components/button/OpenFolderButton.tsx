import { LuFolderSearch } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from ".";
import { open } from "@tauri-apps/api/dialog";
import { readDirectory } from "../../utils/fs";

export const OpenFolderButton = ({ ...props }: ActionButtonProps) => {
  const openFolder = async () => {
    const selected = await open({
      directory: true,
    });
    if (!selected) return;
    readDirectory(selected + "/").then((files) => {
      console.log(files);
    });
  };

  return (
    <ActionButton onClick={openFolder} {...props} title="Open Folder">
      <LuFolderSearch className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};
