use serde::{Deserialize, Serialize};
use serde_json::Result;
use std::fs;
use std::path::Path;
use std::time::SystemTime;

// #[warn(dead_code)]
#[derive(Serialize, Deserialize, Debug)]
pub struct FileInfo {
    name: String,
    last_edit_time: u128,
    path: String,
}

pub fn read_folder(dir_path: &str) -> String {
    let new_path = Path::new(dir_path);
    let paths = fs::read_dir(new_path).unwrap();

    let mut files: Vec<FileInfo> = Vec::new();

    for path in paths {
        let path_unwrap = path.unwrap();

        let filename = match path_unwrap.file_name().into_string() {
            Ok(str) => str,
            Err(_error) => String::from("ERROR"),
        };

        if !filename.ends_with(".md") {
            continue;
        }

        let filename_only = filename.split('.').next().unwrap().to_string();
        let file_path = dir_path.to_owned() + &filename;

        let metadata = fs::metadata(&file_path);
        let last_mod_time = match metadata {
            Ok(meta) => meta.modified().expect("Failed to get last edit time"),
            Err(error) => panic!("Problem getting metadata: {:?}", error),
        };
        let last_edit_time = last_mod_time
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_millis();

        let new_file_info = FileInfo {
            name: filename_only,
            last_edit_time,
            path: file_path,
        };

        files.push(new_file_info);
    }

    let files_str = match serde_json::to_string(&files) {
        Ok(str) => str,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };

    files_str
}

pub fn read_file(path: &str) -> String {
    let contents = fs::read_to_string(path).expect("ERROR");
    contents
}

// update file and create new file
pub fn write_file(path: &str, content: &str) -> String {
    let file_path = Path::new(path);
    let result = match fs::write(file_path, content) {
        Ok(()) => String::from("OK"),
        Err(_err) => String::from("ERROR"),
    };

    result
}

pub fn delete_file(path: &str) -> Result<()> {
    let file_path = Path::new(path);
    fs::remove_file(file_path).unwrap();
    Ok(())
}
