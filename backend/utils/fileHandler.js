const multer = require('multer');
const path = require('path');

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original file name
  }
});

// Set up file upload validation for PDF and DOCX formats
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Error: File upload only supports the following formats: ' + filetypes));
  }
});

module.exports = upload; // Export the upload middleware