#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use pdf_extract::extract_text; // from the previous step

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn parse_pdf_files(file_name: String) ->  Result<String, String>{
   
    match extract_text(file_name){
        Err(_) => Err("This failed!".into()),
        Ok(msg) => Ok(msg.into())
    }

}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![parse_pdf_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
