const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const verify = require('../middleware/auth');

router.post('/records', verify, recordController.getRecords);

module.exports = router;
