import { LuFileSignature } from "react-icons/lu";
import { ActionButton, ActionButtonProps } from ".";

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {

  const handleCreation = async () => {
  };

  return (
    <ActionButton onClick={handleCreation} {...props} title="New File">
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};
