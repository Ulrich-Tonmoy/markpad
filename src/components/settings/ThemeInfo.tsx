import { configAtom, updateThemeAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export const ThemeInfo = () => {
  const config = useAtomValue(configAtom);
  const updateTheme = useSetAtom(updateThemeAtom);
  const [currentTheme, setCurrentTheme] = useState<string>("");

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    updateTheme(theme);
    setCurrentTheme(theme);
  };

  useEffect(() => {
    setCurrentTheme(config.theme);
  }, []);

  return (
    <div className="p-4">
      <h2>Manage Themes</h2>
      <div className="flex mt-2 space-x-4">
        <button
          onClick={() => setTheme("")}
          className="w-10 h-10 bg-transparent border-2 border-white rounded-full"
          title="Transparent"
          disabled={currentTheme === ""}
        />
        <button
          onClick={() => setTheme("dark")}
          className="w-10 h-10 bg-black border-2 border-white rounded-full"
          title="Dark"
          disabled={currentTheme === "dark"}
        />
        <button
          onClick={() => setTheme("red")}
          className="w-10 h-10 bg-red-500 border-2 border-white rounded-full"
          title="Red"
          disabled={currentTheme === "red"}
        />
        <button
          onClick={() => setTheme("yellow")}
          className="w-10 h-10 bg-yellow-500 border-2 border-white rounded-full"
          title="Yellow"
          disabled={currentTheme === "yellow"}
        />
        <button
          onClick={() => setTheme("green")}
          className="w-10 h-10 bg-green-500 border-2 border-white rounded-full"
          title="Green"
          disabled={currentTheme === "green"}
        />
        <button
          onClick={() => setTheme("blue")}
          className="w-10 h-10 bg-blue-500 border-2 border-white rounded-full"
          title="Blue"
          disabled={currentTheme === "blue"}
        />
        <button
          onClick={() => setTheme("purple")}
          className="w-10 h-10 bg-purple-500 border-2 border-white rounded-full"
          title="purple"
          disabled={currentTheme === "purple"}
        />
      </div>
    </div>
  );
};
