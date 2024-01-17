import { ComponentProps } from "react";
import { DeleteNoteButton, NewNoteButton } from "..";
import { OpenFolderButton } from "@/components";

export const ActionButtonsLayout = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <OpenFolderButton />
      <DeleteNoteButton />
    </div>
  );
};
