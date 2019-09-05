const express = require('express');
const router = express.Router();

// @route   GET api/comment
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Comment route'));

module.exports = router;

