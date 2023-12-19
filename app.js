const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

function renameFile(userId,timestamp,oldFile,outputFolder){
    const FileExt = path.extname(oldFile)
    // console.log(FileExt)
    oldName = path.basename(oldFile);
    newName = `${userId}${timestamp}${oldName}`;
    newFile = path.join(outputFolder,newName) 
    fs.rename(oldFile, newFile, (err)=>{
        if (err){
            console.error('error',error);
        }else{
            console.log('File renamed succesfully');
        }
    })
}

userId = "2"
timestamp = "5728"
const inputFolder = path.join(__dirname, 'source');
const outputFolder = path.join(__dirname, 'destination');
//list of all the files
const filesToRename = fs.readdirSync(inputFolder);
//iterating one by one
for (const fileName of filesToRename){
    const oldFile = path.join(inputFolder,fileName)
    renameFile(userId,timestamp,oldFile,outputFolder)
}


