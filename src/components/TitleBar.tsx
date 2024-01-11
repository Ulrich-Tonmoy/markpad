import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";

const TitleBar = () => {
  const [isScaleUp, setIsScaleUp] = useState(false);

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
    <div id="titlebar" data-tauri-drag-region>
      <div className="flex items-center gap-1">
        <img
          src="/logo.png"
          alt="codium"
          className="w-5 mr-2 cursor-default"
          title="Codium"
        />
      </div>
      <div className="flex items-center justify-center w-1/3 px-2 text-gray-200 rounded-md shadow-sm outline-none cursor-pointer sm:text-sm bg-primary">
        Obsidian
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
          id="ttb-close"
          className="titlebar-icon"
          src="close.svg"
          alt="Close"
          title="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default TitleBar;
