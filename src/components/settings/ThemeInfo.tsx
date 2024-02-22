import { THEMES } from "@/libs";
import { configAtom, updateConfigAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const ThemeInfo = () => {
  const config = useAtomValue(configAtom);
  const updateConfig = useSetAtom(updateConfigAtom);
  const [currentTheme, setCurrentTheme] = useState<string>("");

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    config.theme = theme;
    updateConfig(config);
    setCurrentTheme(theme);
  };

  useEffect(() => {
    setCurrentTheme(config.theme);
  }, []);

  return (
    <>
      <h2 className="text-lg text-text">Manage Themes</h2>
      <div className="flex mt-2 space-x-4">
        {THEMES.map((theme, i) => (
          <button
            key={i}
            onClick={() => setTheme(theme.key)}
            className={twMerge(
              "w-10 h-10 border-2 border-white rounded-full",
              theme.color,
            )}
            title={theme.name}
            disabled={currentTheme === theme.key}
          />
        ))}
      </div>
    </>
  );
};
