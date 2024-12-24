const {Storage} = require("@google-cloud/storage");
const path = require("path")

require("dotenv").config()

const storage = new Storage({
    projectId: process.env.FIREBASE_ID,
    keyFilename: path.join(__dirname, process.env.FIREBASE_JSON_FILE)
})

const bucket = storage.bucket(process.env.FIREBASE_BUCKET_URL)

const uploadImageToStorage = (file, model) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No image file');
      }
      let newFileName = `${model}_${Date.now()}`;
  
      let fileUpload = bucket.file(newFileName);
  
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });
  
      blobStream.on('error', () => {
        reject('Something is wrong! Unable to upload at the moment.');
      });
  
      blobStream.on('finish', () => {
        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`;
        resolve(url);
      });
  
      blobStream.end(file.buffer);
    });
  }


  const uploadImagesToStorage = (files, model) => {
    let promiseArray = [];

    files.forEach((file, i) => promiseArray.push(uploadImageToStorage(file, model)));

    return Promise.all(promiseArray);  
  }


module.exports = {
    uploadImageToStorage,
    uploadImagesToStorage
}