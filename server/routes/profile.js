const express = require('express');
const router = express.Router();
const auth = require('../middleware/login');
const Profile = require('../models/user.model');
const User = require('../models/user.model');
const { check, validationResult } = require('express-validator');



router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['username', 'avatar']);
        
        if(!profile) {
            return res.status(400).json({message: 'Thereis no profil'});
    }

    res.json(profile);
    }
    catch (err) {
        console.error(err.message).res.status(500).send('Server error');
    }
});


module.exports = router;