import { FaFolderTree } from "react-icons/fa6";
import { ActionButton, ActionButtonProps } from "@/components";
import { useAtomValue, useSetAtom } from "jotai";
import { sidebarShowAtom, updateSidebarShowAtom } from "@/store";
import { LuFolderTree } from "react-icons/lu";

export const SidebarVewButton = ({ ...props }: ActionButtonProps) => {
  const sidebarShow = useAtomValue(sidebarShowAtom);
  const updateSidebarShow = useSetAtom(updateSidebarShowAtom);

  const handleSidebarToggle = async () => {
    updateSidebarShow(!sidebarShow);
  };

  if (!sidebarShow)
    return (
      <ActionButton onClick={handleSidebarToggle} {...props} title="Open Sidebar">
        <FaFolderTree className="w-4 h-4 text-text" />
      </ActionButton>
    );

  return (
    <ActionButton onClick={handleSidebarToggle} {...props} title="Close Sidebar">
      <LuFolderTree className="w-4 h-4 text-text" />
    </ActionButton>
  );
};
