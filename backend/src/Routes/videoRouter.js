const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/videoController');

router.post('/uploadVideo', videoController.uploadVideo);

module.exports = router;