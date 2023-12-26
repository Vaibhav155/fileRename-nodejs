const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const express = require('express');
const app = express();

async function renameFile(userId,timestamp,oldFile,outputFolder){
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

async function copyFiles(inputFolder,copyFolder){
    const filesToCopy = fs.readdirSync(inputFolder);
    filesToCopy.forEach((fileName) => {
        sourceFilePath = path.join(inputFolder, fileName);
        destinationFilePath = path.join(copyFolder, fileName);
        readStream = fs.createReadStream(sourceFilePath);
        writeStream = fs.createWriteStream(destinationFilePath);
        readStream.pipe(writeStream);
    })
        
}

async function renameCopiedFiles(userId,timestamp,oldPath,thumbFolder){
    FileExt = path.extname(oldPath);
    oldName = path.basename(oldPath,FileExt);
    console.log(oldName);
    thumbName = `${userId}${timestamp}${oldName}_thumbnail${FileExt}`;
    thumbFile = path.join(thumbFolder,thumbName)
    fs.rename(oldPath, thumbFile, (err) =>{
        if (err){
            console.error('err',err);
        }
        else{
            console.log('thumbnail added');
        }
    })
    
}

async function resize(thumbFolder,resizedFiles,width, height){
    sharp(thumbFolder)
        .resize({width , height})
        .toFile(resizedFiles, (err, info) => {
            if (err){
                console.error('Error',err);
            }else{
                console.log('Image resized',info);
            }
        });
}

userId = "2"
timestamp = "5728"
const inputFolder = path.join(__dirname, 'source');
const outputFolder = path.join(__dirname, 'destination');
const thumbFolder = path.join(__dirname, 'thumbnail');
const copyFolder = path.join(__dirname, 'copyfolder');
const resizedFiles = path.join(__dirname, 'resizedFiles');
const width = 300;
const height = 300;
copyFiles(inputFolder,copyFolder);
//list of all the files
const filesToRename = fs.readdirSync(inputFolder);
//iterating one by one
for (const fileName of filesToRename){
    const oldFile = path.join(inputFolder,fileName)
    renameFile(userId, timestamp, oldFile, outputFolder)
}

const srcFiles = fs.readdirSync(copyFolder);
for (const file of srcFiles){
    const oldPath = path.join(copyFolder,file)
    renameCopiedFiles(userId,timestamp,oldPath,thumbFolder)
}
resize(thumbFolder,resizedFiles, width, height)