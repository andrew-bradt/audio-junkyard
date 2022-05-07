const express = require('express');
const router = express.Router();

router.get('/application', (req, res) => {
  res.send('TODO: /api/downloads/application');
});

router.get('/audio/:date_range', (req, res) => {
  const {date_range} = req.params;
  res.send(`TODO: /api/downloads/audio/${date_range}`);
});

module.exports = router;