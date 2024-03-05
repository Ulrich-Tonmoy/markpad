import {
  CONFIG_FILE_NAME,
  INITIAL_CONFIG,
  MarkpadConfig,
  ViewState,
  writeFile,
} from "@/libs";
import { dataDir } from "@tauri-apps/api/path";
import { atom } from "jotai";
import { selectedNoteIndexAtom } from ".";

const dataDirPath = async () => {
  return (await dataDir()) + CONFIG_FILE_NAME;
};

export const viewAtom = atom<ViewState>(ViewState.Null);
export const configAtom = atom<MarkpadConfig>(INITIAL_CONFIG);

export const updateConfigDataAtom = atom(
  null,
  async (_get, set, config: MarkpadConfig) => {
    const dirPath = await dataDirPath();
    set(configAtom, config);
    await writeFile(dirPath, JSON.stringify(config));
  },
);

export const updateViewAtom = atom(null, async (_, set, view: ViewState) => {
  set(viewAtom, view);
  if (view === ViewState.Settings) set(selectedNoteIndexAtom, null);
});
