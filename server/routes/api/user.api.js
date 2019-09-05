const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
// info express-validator : requires to express-validator/check are deprecated.You should just use require("express-validator") instead.

// @route   GET api/user
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('User route'));

// @route   POST api/user
// @desc    Register route
// @access  Public
router.post('/', [
   check('username', 'Username is required').not().isEmpty(),
   check('email', 'Please include a valid email').isEmail(),
   check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
   check('birthdate', 'Birthdate is required').isEmpty()
], (req, res) => {
   console.log(req.body);
   res.send('User route')
});

module.exports = router;

