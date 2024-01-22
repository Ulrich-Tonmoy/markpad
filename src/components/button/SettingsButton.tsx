import { LuCog } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from "@/components";

export const SettingsButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props} title="Settings">
      <LuCog className="w-4 h-4 text-text" />
    </ActionButton>
  );
};
