import { ComponentProps } from "react";
import { NotePreview } from "@/components";
import { twMerge } from "tailwind-merge";
import { useNotesList } from "@/libs";

export type NotePreviewListProps = ComponentProps<"ul"> & {
  onSelect?: () => void;
};

export const NotePreviewList = ({
  onSelect,
  className,
  ...props
}: NotePreviewListProps) => {
  const { notes, openedFolderPath, selectedNoteIndex, handleNoteSelect } = useNotesList({
    onSelect,
  });

  if (!openedFolderPath) {
    return (
      <ul className={twMerge("text-center pt-4", className)} {...props}>
        <span>Open a folder to get started.</span>
      </ul>
    );
  }

  if (!notes?.length) {
    return (
      <ul className={twMerge("text-center pt-4", className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    );
  }

  return (
    <ul className={className} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={index}
          isActive={selectedNoteIndex === index}
          onClick={handleNoteSelect(index)}
          {...note}
        />
      ))}
    </ul>
  );
};
