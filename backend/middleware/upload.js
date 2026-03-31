import multer from "multer";
import path from "path";

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder
  },
  filename: function (req, file, cb) {
    const cleanName = file.originalname
      .replace(/\s+/g, "-") // remove spaces
      .replace(/[^\w.-]/g, ""); // remove weird characters

    cb(null, Date.now() + "-" + cleanName);
  },
});

const upload = multer({ storage });

export default upload;
