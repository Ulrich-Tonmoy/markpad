import { ActionButton, ActionButtonProps } from "@/components";
import { FaClockRotateLeft } from "react-icons/fa6";
import { ViewState, cn, useConfig } from "@/libs";

export const RecentVewButton = ({ ...props }: ActionButtonProps) => {
  const { view, updateView } = useConfig();

  const openRecentFolders = () => {
    view == ViewState.Recent ? updateView(ViewState.Null) : updateView(ViewState.Recent);
  };

  return (
    <ActionButton onClick={openRecentFolders} {...props} title="Recent Folders">
      <FaClockRotateLeft
        className={cn("size-4", { "text-violet-500": view == ViewState.Recent })}
      />
    </ActionButton>
  );
};
