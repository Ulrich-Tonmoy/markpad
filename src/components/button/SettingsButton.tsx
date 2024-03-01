import { LuCog } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from "@/components";
import { useAtomValue, useSetAtom } from "jotai";
import { updateViewAtom, viewAtom } from "@/store";
import { View, cn } from "@/libs";

export const SettingsButton = ({ ...props }: ActionButtonProps) => {
  const view = useAtomValue(viewAtom);
  const updateView = useSetAtom(updateViewAtom);

  const openSettings = async () => {
    view == View.Settings ? updateView(View.Null) : updateView(View.Settings);
  };

  return (
    <ActionButton onClick={openSettings} {...props} title="Settings">
      <LuCog className={cn("size-5", { "text-violet-500": view == View.Settings })} />
    </ActionButton>
  );
};
