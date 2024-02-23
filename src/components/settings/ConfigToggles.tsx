import { configAtom, updateConfigDataAtom } from "@/store";
import { useAtom, useSetAtom } from "jotai";
import { ChangeEvent } from "react";

export const ConfigToggles = () => {
  const [config, setConfig] = useAtom(configAtom);
  const updateConfigData = useSetAtom(updateConfigDataAtom);

  const handleWelcomeContentToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setConfig((prevConfig) => ({ ...prevConfig, welcomeContent: isChecked }));
    const updatedConfig = { ...config, welcomeContent: isChecked };
    updateConfigData(updatedConfig);
  };

  const handleOpenFirstToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setConfig((prevConfig) => ({ ...prevConfig, openFirstFile: isChecked }));
    const updatedConfig = { ...config, openFirstFile: isChecked };
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
    </>
  );
};
