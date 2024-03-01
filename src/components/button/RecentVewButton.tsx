import { ActionButton, ActionButtonProps } from "@/components";
import { useAtomValue, useSetAtom } from "jotai";
import { updateViewAtom, viewAtom } from "@/store";
import { FaClockRotateLeft } from "react-icons/fa6";
import { View } from "@/libs";

export const RecentVewButton = ({ ...props }: ActionButtonProps) => {
  const view = useAtomValue(viewAtom);
  const updateView = useSetAtom(updateViewAtom);

  const openRecentFolders = async () => {
    view == View.Recent ? updateView(View.Null) : updateView(View.Recent);
  };

  const color = view == View.Recent ? "#8F00FF" : "";
  return (
    <ActionButton onClick={openRecentFolders} {...props} title="Open Sidebar">
      <FaClockRotateLeft className="w-4 h-4 text-text" color={color} />
    </ActionButton>
  );
};
