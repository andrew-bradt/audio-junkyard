const fs = require('fs');
const express = require('express');
const router = express.Router();

const {uploadFiles} = require('../../helpers/s3-helpers');
const makeUploadTarget = require('../../helpers/make-upload-target');
const protectedRoute = require('../../middleware/protected-route');

const uploadUserAudio = makeUploadTarget('user_audio');
const uploadGrain = makeUploadTarget('grains');

router.post('/user_audio', uploadUserAudio.single('audio'), async(req, res) => {
  await uploadFiles(req.file, 'user_audio');
  fs.unlink(req.file.path, (err) => {
    if (!err) {
      res.send('api/user_audio');
    }
  });
});

router.use(protectedRoute);

router.post('/grains', uploadGrain.single('audio'), async(req, res) => {
  await uploadFiles(req.file, 'grains');
  fs.unlink(req.file.path, (err) => {
    if (!err) {
      res.send('api/grains');
    }
  });
});

module.exports = router;