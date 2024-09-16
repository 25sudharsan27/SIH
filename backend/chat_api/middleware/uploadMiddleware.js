const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'chat-api',
    allowedFormats: ['jpeg', 'jpg', 'png', 'gif', 'mp4', 'mov'],
  },
});

// Configure local storage (uncomment if using local storage instead of Cloudinary)
// const path = require('path');
// const localStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

const upload = multer({ storage });

// Uncomment the below section to use local storage instead of Cloudinary
// const upload = multer({
//   storage: localStorage,
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif|mp4|mov/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only images and videos are allowed'));
//     }
//   }
// });

module.exports = upload;
