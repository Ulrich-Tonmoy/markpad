import { FaFolderTree } from "react-icons/fa6";
import { ActionButton, ActionButtonProps } from "@/components";
import { useAtom, useSetAtom } from "jotai";
import { configAtom, updateConfigDataAtom } from "@/store";
import { LuFolderTree } from "react-icons/lu";

export const SidebarVewButton = ({ ...props }: ActionButtonProps) => {
  const [config, setConfig] = useAtom(configAtom);
  const updateConfigData = useSetAtom(updateConfigDataAtom);

  const handleSidebarToggle = async () => {
    setConfig((prevConfig) => ({ ...prevConfig, showSidebar: !prevConfig.showSidebar }));
    const updatedConfig = { ...config, showSidebar: !config.showSidebar };
    await updateConfigData(updatedConfig);
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
