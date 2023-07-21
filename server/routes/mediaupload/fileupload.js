// fileUpload.js
const express = require('express');
const multer = require('multer');
const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filenames
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  // Handle file upload here
  const file = req.file;
  console.log(file);
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // You can access the file properties using `file` object
  const { originalname, filename, path } = file;
  return res.json({ message: 'File uploaded successfully', originalname, filename, path });
});

module.exports = router;
