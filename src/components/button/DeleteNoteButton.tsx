import { FaRegTrashCan } from "react-icons/fa6";
import { ActionButton, ActionButtonProps } from "@/components";
import { deleteNoteAtom } from "@/libs";
import { useSetAtom } from "jotai";

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom);

  const handleDelete = () => {
    deleteNote();
  };

  return (
    <ActionButton onClick={handleDelete} {...props} title="Delete Selected">
      <FaRegTrashCan className="size-4" />
    </ActionButton>
  );
};
