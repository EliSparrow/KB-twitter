const express = require('express');
const router = express.Router();

// @route   GET api/follow
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Follow route'));

module.exports = router;

