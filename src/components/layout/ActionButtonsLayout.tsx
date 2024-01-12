import { ComponentProps } from "react";
import { DeleteNoteButton, NewNoteButton } from "..";

export const ActionButtonsLayout = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  );
};
