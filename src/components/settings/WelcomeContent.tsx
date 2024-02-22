import { configAtom, updateConfigDataAtom } from "@/store";
import { useAtom, useSetAtom } from "jotai";
import { ChangeEvent } from "react";

export const WelcomeContent = () => {
  const [config, setConfig] = useAtom(configAtom);
  const updateConfigData = useSetAtom(updateConfigDataAtom);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setConfig((prevConfig) => ({ ...prevConfig, welcomeContent: isChecked }));
    const updatedConfig = { ...config, welcomeContent: isChecked };
    updateConfigData(updatedConfig);
  };

  console.log(config.welcomeContent);
  return (
    <div className="flex items-center mt-3 text-lg text-text">
      <input
        type="checkbox"
        className="w-4 h-4 mr-2 cursor-pointer"
        checked={config.welcomeContent}
        onChange={handleCheckboxChange}
      />
      Add Welcome Content
    </div>
  );
};
