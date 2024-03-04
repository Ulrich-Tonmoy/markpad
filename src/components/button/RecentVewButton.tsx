import { ActionButton, ActionButtonProps } from "@/components";
import { FaClockRotateLeft } from "react-icons/fa6";
import { View, cn } from "@/libs";
import { useConfig } from "@/hooks";

export const RecentVewButton = ({ ...props }: ActionButtonProps) => {
  const { view, updateView } = useConfig();

  const openRecentFolders = async () => {
    view == View.Recent ? updateView(View.Null) : updateView(View.Recent);
  };

  return (
    <ActionButton onClick={openRecentFolders} {...props} title="Recent Folders">
      <FaClockRotateLeft
        className={cn("size-4", { "text-violet-500": view == View.Recent })}
      />
    </ActionButton>
  );
};
