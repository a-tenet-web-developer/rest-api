const multer = require("multer");
const fs = require("fs");
const path = require("path");
const File = require("../models/fileModel");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB 
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "image/jpeg",
      "image/png",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
});

const UPLOAD_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

const uploadFile = (req, res) => {
  upload.single("checklistForm")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const filePath = path.join(UPLOAD_DIR, req.file.originalname);
      await fs.promises.writeFile(filePath, req.file.buffer);

      const newFile = new File({
        originalName: req.file.originalname,
        path: filePath,
      });

      await newFile.save();
      res.status(201).json({ message: "File uploaded successfully", filePath });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error saving file", error: error.message });
    }
  });
};

module.exports = { uploadFile };
