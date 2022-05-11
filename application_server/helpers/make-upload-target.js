const multer = require('multer');

const makeUploadTarget = (dir) => {
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const name = `${Date.now()}_${file.originalname}`;
      cb(null, name);
    },
    destination: (req, file, cb) => {
      cb(null, `uploads/${dir}`);
    }
  });
  return multer({storage});
};

module.exports = makeUploadTarget;