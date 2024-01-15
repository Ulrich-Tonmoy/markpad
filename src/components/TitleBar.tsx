import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { useAtomValue } from "jotai";
import { selectedNoteAtom } from "../store";

export const TitleBar = () => {
  const [isScaleUp, setIsScaleUp] = useState(false);
  const selectedNote = useAtomValue(selectedNoteAtom);

  const onMinimize = () => appWindow.minimize();
  const onScaleUp = () => {
    appWindow.toggleMaximize();
    setIsScaleUp(true);
  };
  const onScaleDown = () => {
    appWindow.toggleMaximize();
    setIsScaleUp(false);
  };
  const onClose = () => appWindow.close();

  return (
    <div className="titlebar" data-tauri-drag-region>
      <div className="flex items-center gap-1">
        <img
          src="/logo.png"
          alt="codium"
          className="w-5 mr-2 cursor-default"
          title="Codium"
        />
      </div>
      <div data-tauri-drag-region className="text-purple-500 cursor-default">
        Obsidian {selectedNote && `- ${selectedNote.title}`}
      </div>
      <div className="titlebar-actions">
        <img
          className="titlebar-icon"
          src="/minimize.svg"
          alt="Minimize"
          title="Minimize"
          onClick={onMinimize}
        />
        {isScaleUp ? (
          <img
            className="titlebar-icon"
            src="restore-down.svg"
            alt="Restore Down"
            title="Restore Down"
            onClick={onScaleDown}
          />
        ) : (
          <img
            className="titlebar-icon"
            src="maximize.svg"
            alt="Maximize"
            title="Maximize"
            onClick={onScaleUp}
          />
        )}
        <img
          className="titlebar-icon close"
          src="close.svg"
          alt="Close"
          title="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
