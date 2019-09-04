const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

router.post ('/', [
check('username', 'Username is required')
.not()
.isEmpty(),
check('email', 'Email not valid').isEmail(),
check('password', 'Password must be 5 or more characters').isLenght({min: 6})
],
(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({erros: errors.array()});
    }


res.send('User route');
});

module.exports = router;