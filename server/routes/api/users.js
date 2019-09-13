const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/default.json')
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');

const User = require('../../models/user.model');
const Follow = require('../../models/follow.model');

const auth = require('../../middleware/login');


// @route   POST users/register
// @desc    Create a new user
// @access  Public
router.post('/register', [
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

// @route   GET users/
// @desc    GET all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ username: 1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET users/me
// @desc    GET Online users
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if(!user){
      return res.status(404).json({ msg: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'User not found'})
    }
    res.status(500).send('Server Error');
  }
})

// @route   GET users/user/:id
// @desc    GET users by id
// @access  Private
router.get('/user/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if(!user){
      return res.status(404).json({ msg: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'User not found'})
    }
    res.status(500).send('Server Error');
  }
})


// @route   PUT users/:id/update
// @desc    Update user by id
// @access  Private
router.put('/:id/update', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    const loggedInUser = await User.findById(req.user.id).select('admin');

    if(!user){
      return res.status(404).json({ msg: 'User not found' })
    }

    if(user.id.toString() !== req.user.id){
      return res.status(401).json({ msg: 'User not authorized' })
    }

    if(loggedInUser === true){
      user.admin = req.body.admin;
      user.banned.status = req.body.banned;
      user.banned.date = req.body.banned_date;
    }

    // user.username = req.body.username;
    user.description = req.body.description;
    user.website = req.body.website;
    user.suspended = req.body.suspended;
    user.birthdate = req.body.birthdate;
    user.language = req.body.language;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
    
  }
})


// FOLLOW SECTION

// @route   users/:id/follow
// @desc    Follow a user
// @access  Private
router.post('/:id/follow', auth, async (req, res) => {
  try {
    let follow = await Follow.findOne({ followedId: req.params.id, userId: req.user.id});
    const user = await User.findById(req.params.id).select('-password');

    if(!user){
      return res.status(404).json({ msg: 'User not found' })
    }

    if (follow) {
      return res.status(400).json({ errors: [{ message: 'User already followed' }] });
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
router.delete('/:id/unfollow', auth, async (req, res) => {
  try {
    const follow = await Follow.findOne({ followedId: req.params.id, userId: req.user.id});

    if(!follow){
      return res.status(404).json({ msg: 'User not found' })
    }
    
    // Check on user
    if(follow.userId.toString() !== req.user.id){
      return res.status(401).json({ msg: 'User not authorized'})
    }

    await follow.remove();

    res.json(follow);

  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'User not found'})
    }
    res.status(500).send('Server Error')
  }
});

// @route   GET users/:id/following
// @desc    GET following users
// @access  Public
router.get('/:id/followers', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    const followings = await Follow.find({ userId: user.id}).populate('followedId', ['username', 'avatar', '_id'], User)

    if(!user){
      return res.status(404).json({ msg: 'User not found'})
    }

    res.json(followings);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.status(500).send('Server Error');
  }
});


// @route   GET users/:id/followers
// @desc    GET user's followers
// @access  Public
router.get('/:id/following', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    const followers = await Follow.find({ followedId: user.id}).populate('userId', ['username', 'avatar', '_id'], User)

    if(!user){
      return res.status(404).json({ msg: 'User not found'})
    }

    res.json(followers);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;