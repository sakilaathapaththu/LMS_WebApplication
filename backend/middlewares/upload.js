// const multer = require("multer");
// const path = require("path");

// // Destination folder: /uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// const upload = multer({ storage: storage });
// module.exports = upload;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Dynamic folder based on field name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads/";
    if (file.fieldname === "coverImage") folder += "covers";
    else if (file.fieldname === "attachments") folder += "attachments";

    // Create folder if it doesn't exist
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
