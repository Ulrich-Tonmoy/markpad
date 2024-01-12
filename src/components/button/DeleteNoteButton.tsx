import { FaRegTrashCan } from "react-icons/fa6";
import { ActionButton, ActionButtonProps } from ".";

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {

  const handleDelete = async () => {
  };

  return (
    <ActionButton onClick={handleDelete} {...props} title="Delete Selected">
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};
