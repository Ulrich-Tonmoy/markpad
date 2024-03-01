import { FaFolderTree } from "react-icons/fa6";
import { ActionButton, ActionButtonProps } from "@/components";
import { useAtom, useSetAtom } from "jotai";
import { configAtom, updateConfigDataAtom } from "@/store";
import { cn } from "@/libs";

export const SidebarVewButton = ({ ...props }: ActionButtonProps) => {
  const [config, setConfig] = useAtom(configAtom);
  const updateConfigData = useSetAtom(updateConfigDataAtom);

  const handleSidebarToggle = async () => {
    setConfig((prevConfig) => ({ ...prevConfig, showSidebar: !prevConfig.showSidebar }));
    const updatedConfig = { ...config, showSidebar: !config.showSidebar };
    await updateConfigData(updatedConfig);
  };

  return (
    <ActionButton onClick={handleSidebarToggle} {...props} title="Collapse Sidebar">
      <FaFolderTree className={cn("size-4", { "text-violet-500": config.showSidebar })} />
    </ActionButton>
  );
};
