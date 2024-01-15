import { ComponentProps } from "react";
import { notesMock } from "../store/mocks";
import { NotePreview } from "./NotePreview";
import { twMerge } from "tailwind-merge";

export type NotePreviewListProps = ComponentProps<"ul"> & {
  onSelect?: () => void;
};

export const NotePreviewList = ({
  onSelect,
  className,
  ...props
}: NotePreviewListProps) => {
  if (false) {
    return (
      <ul className={twMerge("text-center pt-4", className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    );
  }

  return (
    <ul className={className} {...props}>
      {notesMock.map((note, index) => (
        <NotePreview
          key={index}
          {...note}
        />
      ))}
    </ul>
  );
};
