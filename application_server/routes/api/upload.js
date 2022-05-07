const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('api/upload');
});

module.exports = router;