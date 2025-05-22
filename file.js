// file.js
const express = require('express');              // Express to create router
const multer = require('multer');                 // Multer for file uploads
const path = require('path');                      // Path for directory handling
const fs = require('fs');                          // File system to check/create directories

const router = express.Router();

// Define upload directory path relative to this file
const uploadPath = path.join(__dirname, 'diskstorage');

// Create upload directory if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Configure Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

// Create Multer upload middleware instance
const upload = multer({ storage });

// Serve uploaded files statically under /file/uploads
router.use('/uploads', express.static(uploadPath));

// GET /file/ - Render upload form (file.ejs)
router.get('/', (req, res) => {
  res.render('file'); // Make sure you have views/file.ejs
});

// POST /file/upload - Handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send(`File uploaded successfully. <a href="/file/uploads/${req.file.filename}" target="_blank">View File</a>`);
});

module.exports = router;
