
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Dynamic folder based on field name
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let folder = "uploads/";
//     if (file.fieldname === "coverImage") folder += "covers";
//     else if (file.fieldname === "attachments") folder += "attachments";

//     // Create folder if it doesn't exist
//     fs.mkdirSync(folder, { recursive: true });
//     cb(null, folder);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;
// upload.js
const multer = require("multer");
const { put } = require("@vercel/blob");

// Use in-memory storage (Vercel FS is read-only)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB (tweak if needed)
});

// Helper: push a single file buffer to Vercel Blob and return public URL
async function uploadToVercelBlob(file, folder = "uploads") {
  if (!file) return null;

  const safeName = file.originalname.replace(/\s+/g, "_");
  const key = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`;

  const { url } = await put(key, file.buffer, {
    access: "public",
    contentType: file.mimetype,
    token: process.env.BLOB_READ_WRITE_TOKEN, // must be set on Vercel
  });

  return url; // public HTTPS URL
}

module.exports = { upload, uploadToVercelBlob };
