import { FaFolderTree } from "react-icons/fa6";
import { ActionButton, ActionButtonProps } from "@/components";
import { cn } from "@/libs";
import { useConfig } from "@/hooks";

export const SidebarVewButton = ({ ...props }: ActionButtonProps) => {
  const { config, updateConfigData } = useConfig();

  const handleSidebarToggle = async () => {
    const updatedConfig = { ...config, showSidebar: !config.showSidebar };
    await updateConfigData(updatedConfig);
  };

  return (
    <ActionButton onClick={handleSidebarToggle} {...props} title="Collapse Sidebar">
      <FaFolderTree className={cn("size-4", { "text-violet-500": config.showSidebar })} />
    </ActionButton>
  );
};
