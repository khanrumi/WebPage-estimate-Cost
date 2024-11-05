// server/routes/estimateRoutes.js
const express = require('express');
const { createEstimate } = require('../controllers/estimateController');

const router = express.Router();

router.post('/estimate', createEstimate);

module.exports = router;
