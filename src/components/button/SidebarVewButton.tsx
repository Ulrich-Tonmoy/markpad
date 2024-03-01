import { FaFolderTree } from "react-icons/fa6";
import { ActionButton, ActionButtonProps } from "@/components";
import { useAtom, useSetAtom } from "jotai";
import { configAtom, updateConfigDataAtom } from "@/store";

export const SidebarVewButton = ({ ...props }: ActionButtonProps) => {
  const [config, setConfig] = useAtom(configAtom);
  const updateConfigData = useSetAtom(updateConfigDataAtom);

  const handleSidebarToggle = async () => {
    setConfig((prevConfig) => ({ ...prevConfig, showSidebar: !prevConfig.showSidebar }));
    const updatedConfig = { ...config, showSidebar: !config.showSidebar };
    await updateConfigData(updatedConfig);
  };

  const color = config.showSidebar ? "#8F00FF" : "";
  return (
    <ActionButton onClick={handleSidebarToggle} {...props} title="Collapse Sidebar">
      <FaFolderTree className="w-4 h-4 text-text" color={color} />
    </ActionButton>
  );
};
