const { Router } = require("express");
const multer = require("multer");
const Appwrite = require('node-appwrite');
const appwriteClient = require("../utils/appwriteClient");

//init multer to store to disk, this means that req.file.path will be available
const fileUpload = multer({
    storage: multer.diskStorage({}),
    // limits: { fileSize: 5000000 }, //5MB enable and configure file upload limit
});

//Init route
const uploadController = Router();

//get bucket ID
const bucketID = process.env.APPWRITE_BUCKET_ID;

//Handle file upload
uploadController.post("/upload", fileUpload.single("file"), async (req, res) => {
    try {
        //check if user uploaded a file
        if (typeof req.file === "undefined") {
            return res.status(400).json({
                success: false,
                error: {
                    message: "Please select a valid file and try again",
                },
            });
        }

        //destructure object from req.file
        const { originalname, filename, mimetype, path, size } = req.file ?? {};

        //check if size does not exist or if it is too small
        if (!size || size <= 0) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "The file you selected is too small",
                },
            });
        }

        // check if uploaded file is a zip file
        if (
            ![
                "application/zip",
                "application/x-rar-compressed",
                "application/x-tar",
                "application/gzip",
                "application/x-gzip",
                "application/x-7z-compressed",
                "application/x-bzip2",
            ].includes(mimetype)
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "Please select a valid ZIP file, then try again",
                },
            });
        }

        //Init Appwrite storage service
        const storageService = new Appwrite.Storage(appwriteClient)
        //The file to upload 
        const fileToUpload = Appwrite.InputFile.fromPath(path, originalname)

        // send request
        storageService
            .createFile(bucketID, filename, fileToUpload)
            .then(response => {
                //return success
                return res.status(200).json({
                    success: true,
                    message: "This ZIP file was uploaded successfully",
                    data : {
                        ...response
                    }
                });
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                //return error
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "This file was not uploaded, please try again",
                    }
                });
            });
            
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: {
                message: "A server error has occured",
            },
        });
    }
});

module.exports = uploadController;
