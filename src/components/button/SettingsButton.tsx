import { LuCog } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from "@/components";
import { ViewState, cn, useConfig } from "@/libs";

export const SettingsButton = ({ ...props }: ActionButtonProps) => {
  const { view, updateView } = useConfig();

  const openSettings = () => {
    view == ViewState.Settings
      ? updateView(ViewState.Null)
      : updateView(ViewState.Settings);
  };

  return (
    <ActionButton onClick={openSettings} {...props} title="Settings">
      <LuCog
        className={cn("size-5", { "text-violet-500": view == ViewState.Settings })}
      />
    </ActionButton>
  );
};
