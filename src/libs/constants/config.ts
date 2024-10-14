import { welcome } from "./welcome";

export const CONFIG_FILE_NAME = `/Markpad/config.json`;
export const RECENT_FOLDER_LIST_FILE_NAME = `Markpad/recent.json`;
export const AUTO_SAVING_TIME = 3000;
export const DEFAULT_FILE_NAME = "Untitled";
export const DIALOG_FILTERS = [
  { name: "MarkDown", extensions: ["md"] },
  { name: "Text", extensions: ["txt"] },
];
export const WELCOME_CONTENT = welcome;
