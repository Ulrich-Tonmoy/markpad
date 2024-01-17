import { invoke } from "@tauri-apps/api";
import { NoteContent, NoteInfo } from "@/models";

export const readDirectory = (folderPath: string): Promise<NoteInfo[]> => {
  return new Promise((resolve, _reject) => {
    invoke("open_folder", { folderPath }).then((message: unknown) => {
      const msg = message as string;
      const files = JSON.parse(msg.replaceAll("\\", "/").replaceAll("//", "/"));
      const entries: NoteInfo[] = [];

      if (!files || !files.length) {
        resolve(entries);
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const entry: NoteInfo = {
          lastEditTime: file.last_edit_time,
          title: file.name,
          path: file.path,
        };

        entries.push(entry);
      }
      resolve([...entries]);
    });
  });
};

export const readFile = (filePath: string): Promise<NoteContent> => {
  return new Promise((resolve, reject) => {
    invoke("get_file_content", { filePath })
      .then((message: unknown) => {
        resolve(message as string);
      })
      .catch((error) => reject(error));
  });
};

export const writeFile = (filePath: string, content: NoteContent): Promise<string> => {
  return new Promise((resolve, reject) => {
    invoke("write_file", { filePath, content }).then((message: unknown) => {
      if (message === "OK") {
        resolve(message as string);
      } else {
        reject("ERROR");
      }
    });
  });
};

export const deleteFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    invoke("delete_file", { filePath }).then((message: unknown) => {
      if (message === "OK") {
        resolve(message as string);
      } else {
        reject("ERROR");
      }
    });
  });
};
