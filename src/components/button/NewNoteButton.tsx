import { LuFileSignature } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from "@/components";
import { useConfig } from "@/hooks";

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const { createEmptyNote } = useConfig();

  const handleCreation = () => {
    createEmptyNote();
  };

  return (
    <ActionButton onClick={handleCreation} {...props} title="New File">
      <LuFileSignature className="size-4" />
    </ActionButton>
  );
};
