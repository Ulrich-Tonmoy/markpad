import { CONFIG_FILE_NAME, INITIAL_CONFIG, MarkpadConfig, View, writeFile } from "@/libs";
import { dataDir } from "@tauri-apps/api/path";
import { atom } from "jotai";
import { selectedNoteIndexAtom } from ".";

const dataDirPath = async () => {
  return (await dataDir()) + CONFIG_FILE_NAME;
};

export const viewAtom = atom<View>(View.Null);
export const configAtom = atom<MarkpadConfig>(INITIAL_CONFIG);

export const updateConfigDataAtom = atom(
  null,
  async (_get, set, config: MarkpadConfig) => {
    const dirPath = await dataDirPath();
    set(configAtom, config);
    await writeFile(dirPath, JSON.stringify(config));
  },
);

export const updateViewAtom = atom(null, async (_, set, view: View) => {
  set(viewAtom, view);
  if (view === View.Settings) set(selectedNoteIndexAtom, null);
});
