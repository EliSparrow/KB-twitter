const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/login');

const Post = require('../models/post.model')
const User = require('../models/user.model')
const Follow = require('../models/follow.model')

// @route   POST posts
// @desc    Create a post
// @access  Private

router.post('/', [auth, [
    check('content', 'Text is required')
      .not()
      .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    
    try {
      const user = await User.findById(req.user.id).select('_id')

      const newPost = new Post({
        content: req.body.content,
        userId: user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
    
  }
);

// @route   GET posts
// @desc    GET all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ CreatedAt: -1});
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

// @route   GET posts/:id
// @desc    GET post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if(!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
});

// @route   GET posts/user_posts/:id
// @desc    GET user's post
// @access  Private
router.get('/user_posts/:id', auth, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id })

    if(!posts) {
      return res.status(404).json({ msg: 'Posts not found or User not found' })
    }

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.status(500).send('Server Error')
  }
});

// @route   GET posts/follow
// @desc    GET user's post
// @access  Private
// router.get('/follow', auth, async (req, res) => {
//   try {
//     const posts = await Follow.find({ userId: req.user.id })
//       .populate('post')

//     if(!posts) {
//       return res.status(404).json({ msg: 'Posts not found' })
//     }

//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     if(err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'User not found' })
//     }
//     res.status(500).send('Server Error')
//   }
// });

// @route   PUT posts/:id
// @desc    update post by id
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if(!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    // Check on user
    if(post.userId.toString() !== req.user.id){
      return res.status(401).json({ msg: 'User not authorized'})
    }

    post.content = req.body.content

    await post.save()

    res.json(post)
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
});


// @route   DELETE posts/:id
// @desc    delete post by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    
    // Check on user
    if(post.userId.toString() !== req.user.id){
      return res.status(401).json({ msg: 'User not authorized'})
    }

    await post.remove()

    res.json(post);

  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
});


// LIKE SECTION

// @route   PUT posts/:id/like
// @desc    Like post by id
// @access  Private
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if(post.likes.filter(like => like.userId.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked'})
    }

    post.likes.unshift({ userId: req.user.id });

    await post.save();

    res.json(post.like);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    
  }
})


module.exports = router;