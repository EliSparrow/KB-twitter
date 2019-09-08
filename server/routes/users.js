const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json')
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const User = require('../models/user.model');
const Follow = require('../models/follow.model')

router.post('/', [
    check('username', 'Username is required')
        .not()
        .isEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password must be 5 or more characters').isLength({ min: 5 }),
    //check('birthdate', 'Enter date in format only').isISO8601()
],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const { username, email, password } = req.body;

      try {
          let user = await User.findOne({ email });

          if (user) {
              return res
              .status(400)
              .json({ errors: [{ message: 'Email already exist' }] });
          }

          const avatar = gravatar.url(email, {
              s: '200',
              r: 'pg',
              d: 'mm'
          })

          user = new User({
              username,
              email,
              password,
              avatar
          });

          const salt = await bcrypt.genSalt(10);

          user.password = await bcrypt.hash(password, salt);

          await user.save();

          const payload = {
              user: {
                  id: user.id
              }
          }

          jwt.sign(payload, config.jwtSecret,
              { expiresIn: 360000 },
              (err, token) => {
                  if (err) throw err;
                  res.json({ token });
              });

      }
      catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
      }
});

// @route   users/:id/follow
// @desc    Follow a user
// @access  Private
router.post('/:id/follow', auth, async (req, res) => {
  try {
    const follow = await Follow.findOne({ followedId: req.params.id, userId: req.user.id});

    if (follow) {
      return res
      .status(400)
      .json({ errors: [{ message: 'User already followed' }] });
    }

    follow = new Follow ({
      followedId: req.params.id,
      userId: req.user.id 
    })

    await follow.save()

    res.json(follow)

  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'User not found'})
    }
    res.status(500).send('Server Error')
  }
});
    
// @route   users/:id/unfollow
// @desc    unFollow a user
// @access  Private


module.exports = router;