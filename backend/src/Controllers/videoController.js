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

const uploadVideo = (req, res) => {
  upload.single("video")(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to upload video" });
      console.error(err);
    } else {
      console.log(req.file);
      res.status(200).json({ message: "Video uploaded successfully" });
    }
  });
};

module.exports = {
  uploadVideo,
};
