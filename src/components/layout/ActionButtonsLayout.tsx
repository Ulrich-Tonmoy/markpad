import { ComponentProps } from "react";
import {
  OpenFolderButton,
  DeleteNoteButton,
  NewNoteButton,
  SettingsButton,
} from "@/components";

export const ActionButtonsLayout = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <OpenFolderButton />
      <DeleteNoteButton />
      <SettingsButton />
    </div>
  );
};
