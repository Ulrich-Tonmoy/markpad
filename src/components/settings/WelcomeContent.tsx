import { configAtom, updateConfigAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";

export const WelcomeContent = () => {
  const config = useAtomValue(configAtom);
  const [isEnabled, setIsEnabled] = useState(false);
  const updateConfig = useSetAtom(updateConfigAtom);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsEnabled(isChecked);
    config.welcomeContent = isChecked;
    updateConfig(config);
  };

  useEffect(() => {
    setIsEnabled(config.welcomeContent);
  }, []);

  return (
    <div className="flex items-center mt-3 text-lg text-text">
      <input
        type="checkbox"
        className="w-4 h-4 mr-2 cursor-pointer"
        checked={isEnabled}
        onChange={handleCheckboxChange}
      />
      Add Welcome Content
    </div>
  );
};
