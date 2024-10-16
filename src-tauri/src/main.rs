// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod fs;

#[tauri::command]
fn open_folder(folder_path: &str) -> String {
    let files = fs::read_folder(folder_path);
    files
}

#[tauri::command]
fn get_file_content(file_path: &str) -> String {
    let content = fs::read_file(file_path);
    content
}

#[tauri::command]
fn write_file(file_path: &str, content: &str) -> String {
    fs::write_file(file_path, content);
    String::from("OK")
}

#[tauri::command]
fn delete_file(file_path: &str) -> String {
    fs::delete_file(file_path).unwrap();
    String::from("OK")
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![
            open_folder,
            get_file_content,
            write_file,
            delete_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
