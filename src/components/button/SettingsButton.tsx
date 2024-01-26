import { LuCog } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from "@/components";
import { useSetAtom } from "jotai";
import { updateViewAtom } from "@/store";
import { View } from "@/libs";

export const SettingsButton = ({ ...props }: ActionButtonProps) => {
  const updateView = useSetAtom(updateViewAtom);

  const openSettings = async () => {
    updateView(View.Settings);
  };

  return (
    <ActionButton onClick={openSettings} {...props} title="Settings">
      <LuCog className="w-4 h-4 text-text" />
    </ActionButton>
  );
};
