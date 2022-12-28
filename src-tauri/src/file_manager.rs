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