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

        if (!profile) {
            return res.status(400).json({ message: 'Thereis no profil' });
        }

        res.json(profile);
    }
    catch (err) {
        console.error(err.message).res.status(500).send('Server error');
    }
});


router.post('/', [auth, [
    check('status', 'Status is required')
        .not()
        .isEmpty(),
    check('skills', 'Skills i required')
        .not()
        .isEmpty(),
]],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            description,
            website,
            language
        } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        if (description) profileFields.description = description;
        if (website) profileFields.website = website;
        if (language) profileFields.language = language;
        if (status) profileFields.status = status;
        if (skills) {
            profileFields.skills = skills.split('/').map(skill => skill.trim());
        }

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFileds },
                    { new: true });

                return res.json(profile);
            }

            profile = new Profile(profileFileds)

            await Profile.save();
            res.json(profile);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });


router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
            .populate('user', ['username', 'avatar']);

        if (!profile) return res.status(400)
            .json({ message: 'Profile not found' });


        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectifId') {
            return res.status(400)
                .json({ message: 'Profile not found' });
        }
        res.status(500).send('Server error');
    }
});


router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ message: 'User deleted' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;