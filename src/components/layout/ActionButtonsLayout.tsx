import { ComponentProps } from "react";
import { DeleteNoteButton, NewNoteButton } from "..";
import { OpenFolderButton } from "../button/OpenFolderButton";

export const ActionButtonsLayout = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <OpenFolderButton />
      <DeleteNoteButton />
    </div>
  );
};
