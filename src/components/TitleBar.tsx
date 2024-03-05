import { appWindow } from "@tauri-apps/api/window";
import { useAtomValue, useSetAtom } from "jotai";
import { configAtom, selectedNoteAtom, updateConfigDataAtom } from "@/store";
import { RecentVewButton, SettingsButton, SidebarVewButton } from ".";
import { useEffect } from "react";

export const TitleBar = () => {
  const config = useAtomValue(configAtom);
  const updateConfigData = useSetAtom(updateConfigDataAtom);
  const selectedNote = useAtomValue(selectedNoteAtom);

  const onMinimize = () => appWindow.minimize();
  const onScaleUp = () => {
    appWindow.toggleMaximize();
    const updatedConfig = { ...config, isFullscreen: true };
    updateConfigData(updatedConfig);
  };
  const onScaleDown = () => {
    appWindow.toggleMaximize();
    const updatedConfig = { ...config, isFullscreen: false };
    updateConfigData(updatedConfig);
  };
  const onClose = () => appWindow.close();

  useEffect(() => {
    if (config.isFullscreen) {
      appWindow.maximize();
    }
  }, [config.isFullscreen]);

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between pl-2 border-b border-border"
      data-tauri-drag-region
    >
      <div className="flex items-center gap-1">
        <img
          src="/logo.png"
          alt="codium"
          className="w-5 mr-2 cursor-default"
          title="Codium"
        />
        <SidebarVewButton className="border-none" />
        <RecentVewButton className="border-none" />
        <SettingsButton className="border-none" />
      </div>
      <div data-tauri-drag-region className="cursor-default text-text">
        Markpad {selectedNote && `- ${selectedNote.title}`}
      </div>
      <div className="flex items-center">
        <img
          className="px-2 py-1 text-center cursor-pointer size-7 hover:bg-gray-800"
          src="/minimize.svg"
          alt="Minimize"
          title="Minimize"
          onClick={onMinimize}
        />
        {config.isFullscreen ? (
          <img
            className="px-2 py-1 text-center cursor-pointer size-7 hover:bg-gray-800"
            src="restore-down.svg"
            alt="Restore Down"
            title="Restore Down"
            onClick={onScaleDown}
          />
        ) : (
          <img
            className="px-2 py-1 text-center cursor-pointer size-7 hover:bg-gray-800"
            src="maximize.svg"
            alt="Maximize"
            title="Maximize"
            onClick={onScaleUp}
          />
        )}
        <img
          className="px-2 py-1 text-center cursor-pointer size-7 hover:bg-red-500"
          src="close.svg"
          alt="Close"
          title="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
