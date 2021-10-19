const express = require("express");
const app = express();
const fs = require("fs");
//set up cors so angular and express can communicate on our computer
const cors = require("cors");
app.use(cors());
//this lets angular set img src for anything in the uploads folder
app.use(express.static('uploads'));
//this allows the /file route return JSON
app.use(express.json());
//set up multer to save files in a file called /uploads
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //this part handles putting the file in the /uploads folder
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        //this part handles setting the correct extension for the file
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage});
const PORT = 2222;

//upload a file
app.post("/upload", upload.single('file_to_upload'), (request, response) => {
    response.status(200).send({});
});

//get list of uploaded file names
app.get("/files", (request, response) => {
    //find all files in the uploads folder
    let availableFiles = fs.readdirSync('uploads');
    response.send(availableFiles);
});


app.listen(PORT, () => {
    console.log("Server is running :)");
});