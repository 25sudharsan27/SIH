const express = require('express');
const { suggestJobsForUser } = require('../controllers/jobController');
const router = express.Router();

router.get('/suggest/:userId', suggestJobsForUser);

module.exports = router;
