import { LuCog } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from "@/components";
import { View, cn } from "@/libs";
import { useConfig } from "@/hooks";

export const SettingsButton = ({ ...props }: ActionButtonProps) => {
  const { view, updateView } = useConfig();

  const openSettings = () => {
    view == View.Settings ? updateView(View.Null) : updateView(View.Settings);
  };

  return (
    <ActionButton onClick={openSettings} {...props} title="Settings">
      <LuCog className={cn("size-5", { "text-violet-500": view == View.Settings })} />
    </ActionButton>
  );
};
