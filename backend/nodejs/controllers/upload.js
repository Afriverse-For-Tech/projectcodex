const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const uploadModel = require("../models/upload");

//init multer to store to disk, this means that req.file.path will be available
const fileUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5000000 }, //5MB
});

const uploadController = Router();

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
        const { originalname, mimetype, buffer, size } = req.file ?? {};

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

        //Timestamp to make the file name unique
        const timeStamp = Date.now();
        //the new file name
        const newFileName = timeStamp + "-" + originalname;
        // Define the destination path
        const destinationPath = `./public/${newFileName}`;

        //save the file name in the DB
        const savedDoc = await new uploadModel({
            userId: "12345", //replace with actual userId from loggedIn user session
            fileName: newFileName,
        }).save();

        //check if document was saved
        if (!savedDoc) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "This file was not uploaded, please try again",
                },
            });
        }

        //check if file exists
        if (!fs.existsSync(destinationPath)) {
            //save the file locally on the system
            fs.writeFileSync(destinationPath, buffer);
            //return success
            return res.status(200).json({
                success: true,
                message: "This ZIP file was uploaded successfully",
                data: {
                    id : savedDoc._id //Object ID from the database
                }
            });
        } else {
            //The file exists already
            return res.status(400).json({
                success: false,
                error: {
                    message: "The file you are trying to save exists already",
                },
            });
        }
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
