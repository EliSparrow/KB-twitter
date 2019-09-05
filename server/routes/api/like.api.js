const express = require('express');
const router = express.Router();

// @route   GET api/like
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Like route'));

module.exports = router;

