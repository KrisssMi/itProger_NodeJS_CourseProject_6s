const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/static");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 50MB
  },
});

const uploadVideo = async (req, res) => {
  try {
    const filePath = await new Promise((resolve, reject) => {
      upload.single("video")(req, res, (err) => {
        if (err) {
          reject(null);
        } else {
          if (req.file == undefined) {
            resolve(null);
          } else {
            resolve(req.file.path);
          }
        }
      });
    });

    console.log("File uploaded successfully:", filePath);
    // Handle the uploaded file path here
    return filePath;
  } catch (err) {
    console.error("File upload failed:", err);
    // Handle the upload error here
    return null;
  }
};

module.exports = {
  uploadVideo,
};
