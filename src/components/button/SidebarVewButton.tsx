import { FaFolderTree } from "react-icons/fa6";
import { ActionButton, ActionButtonProps } from "@/components";
import { useAtomValue, useSetAtom } from "jotai";
import { configAtom, updateConfigAtom } from "@/store";
import { LuFolderTree } from "react-icons/lu";

export const SidebarVewButton = ({ ...props }: ActionButtonProps) => {
  const config = useAtomValue(configAtom);
  const updateConfig = useSetAtom(updateConfigAtom);

  const handleSidebarToggle = async () => {
    config.showSidebar = !config.showSidebar;
    updateConfig(config);
  };

  if (!config.showSidebar)
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
