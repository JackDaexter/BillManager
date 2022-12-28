#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use pdf_extract::extract_text; // from the previous step
use std::collections::HashMap;

pub trait FileManager{
    fn parse_pdf_files(&self,file_name: String) ->  Result<String, String>;
    fn files_that_have_been_load(&self,file_name: String) ->  Result<String, String>;
}

pub struct FileData{
    pub analyzed_files: HashMap<String,String>,
}



impl FileManager for FileData{
    fn parse_pdf_files(&self,file_name: String) ->  Result<String, String>{

        match extract_text(file_name){
            Err(_) => Err("This failed!".into()),
            Ok(msg) => Ok(msg.into())
        }

    }
    
    fn files_that_have_been_load(&self,file_name: String) ->  Result<String, String>{

        match extract_text(file_name){
            Err(_) => Err("This failed!".into()),
            Ok(msg) => Ok(msg.into())
        }
    }

}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn parse_pdf_files(file_name: String) ->  Result<String, String>{
   
    match extract_text(file_name){
        Err(_) => Err("This failed!".into()),
        Ok(msg) => Ok(msg.into())
    }

}

#[tauri::command]
fn files_that_have_been_load(file_name: String) ->  Result<String, String>{
   
    match extract_text(file_name){
        Err(_) => Err("This failed!".into()),
        Ok(msg) => Ok(msg.into())
    }
}

fn main() {
    let fm : FileData= FileData { analyzed_files: HashMap::new() };

    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            parse_pdf_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
