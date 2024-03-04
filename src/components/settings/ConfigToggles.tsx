import { configAtom, updateConfigDataAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent } from "react";

export const ConfigToggles = () => {
  const config = useAtomValue(configAtom);
  const updateConfigData = useSetAtom(updateConfigDataAtom);

  const handleWelcomeContentToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const updatedConfig = { ...config, welcomeContent: isChecked };
    updateConfigData(updatedConfig);
  };

  const handleOpenFirstToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const updatedConfig = { ...config, openFirstFile: isChecked };
    updateConfigData(updatedConfig);
  };

  const handleEditorToolbarToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const updatedConfig = { ...config, showEditorToolbar: isChecked };
    updateConfigData(updatedConfig);
  };

  return (
    <>
      <div className="flex items-center mt-3 text-lg text-text">
        <input
          type="checkbox"
          className="w-4 h-4 mr-2 cursor-pointer"
          checked={config.welcomeContent}
          onChange={handleWelcomeContentToggle}
        />
        Add Welcome Content
      </div>
      <div className="flex items-center mt-3 text-lg text-text">
        <input
          type="checkbox"
          className="w-4 h-4 mr-2 cursor-pointer"
          checked={config.openFirstFile}
          onChange={handleOpenFirstToggle}
        />
        Open First File By Default
      </div>
      <div className="flex items-center mt-3 text-lg text-text">
        <input
          type="checkbox"
          className="w-4 h-4 mr-2 cursor-pointer"
          checked={config.showEditorToolbar}
          onChange={handleEditorToolbarToggle}
        />
        Show Editor Toolbars
      </div>
    </>
  );
};
