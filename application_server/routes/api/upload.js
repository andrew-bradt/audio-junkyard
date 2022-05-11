const express = require('express');
const router = express.Router();
const multer = require('multer');
const {uploadFiles} = require('../../helpers/s3-helpers');
const fs = require('fs');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const name = `${Date.now()}_${file.originalname}`;
    cb(null, name);
  },
  destination: (req, file, cb) => {
    cb(null, 'uploads/user_audio');
  }
});

const upload = multer({storage});

router.post('/', upload.single('audio'), async(req, res) => {
  await uploadFiles(req.file, 'user_audio');
  fs.unlink(req.file.path, (err) => {
    if (!err) {
      res.send('api/upload');
    }
  });
});

module.exports = router;