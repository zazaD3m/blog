import multer from "multer";
import path from "path";

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const uploadPicture = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1 * 1000000, //1mb
//   },
//   fileFilter: function (req, file, cb) {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
//       return cb(new Error("Only images are allowed"));
//     }
//     cb(null, true);
//   },
// });

// export { uploadPicture };
