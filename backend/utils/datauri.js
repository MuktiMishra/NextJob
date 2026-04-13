import DataUriParser from "datauri/parser.js"; 

import path from "path"; 

const getDataUri = (file) => {
    const parser = new DataUriParser(); 
    console.log("file:", file); 
    const extname = path.extname(file.originalname).toString(); 
    return parser.format(extname, file.buffer); 
}

export default getDataUri; 
