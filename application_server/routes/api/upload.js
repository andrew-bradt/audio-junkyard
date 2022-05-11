const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const name = `${Date.now()}_${file.originalname}`;
    cb(null, name);
  },
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
});

const upload = multer({storage});

router.post('/', upload.array('audio'), (req, res) => {
  res.send('api/upload');
});

module.exports = router;