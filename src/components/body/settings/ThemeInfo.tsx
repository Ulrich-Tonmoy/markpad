import { THEMES, setTheme } from "@/libs";
import { configAtom, updateConfigDataAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { twMerge } from "tailwind-merge";

export const ThemeInfo = () => {
  const config = useAtomValue(configAtom);
  const updateConfigData = useSetAtom(updateConfigDataAtom);

  const toggleTheme = (theme: string) => {
    setTheme(theme);
    const updatedConfig = { ...config, theme: theme };
    updateConfigData(updatedConfig);
  };

  return (
    <>
      <h2 className="text-lg text-text">Manage Themes</h2>
      <div className="flex mt-2 space-x-4">
        {THEMES.map((theme, i) => (
          <button
            key={i}
            onClick={() => toggleTheme(theme.key)}
            className={twMerge(
              "w-10 h-10 border-2 border-white rounded-full",
              theme.color,
            )}
            title={theme.name}
            disabled={config.theme === theme.key}
          />
        ))}
      </div>
    </>
  );
};
