const express = require('express');
const router = express.Router();
const scheduler = require('./services/scheduler');

// open routes
router.post('/schedule', scheduler.create);

module.exports = router;
