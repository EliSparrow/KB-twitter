const User = require("../models/user.model");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.use(cors());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect()

router.get('/', function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

router.post('/register', function (req, res) {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        birthdate: req.body.birthdate,
        created: user

    });

    const salt = bcrypt.genSalt(10);
    user.password = bcrypt.hash(password, salt);


    user.save()
        .then(user => {
            res.status(200).json({ 'user': 'Register successful.' });
        })
        .catch(err => {
            res.status(400).send('Register error');
        });

});



router.put('/:id/update', function (req, res) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
        if (!user)
            res.status(400).send('No data found');

        else

            user.user_description = req.body.user_description;
        user.user_suspended = req.body.user_suspended;
        user.user_language = req.body.user_language;
        user.user_website = req.body.user_website;
        user.user_admin = req.body.user_admin;

        user.save().then(user => {
            res.json('User Update');
        })
            .catch(err => {
                res.status(400).send('Unsuccesful Update')
            });


    });
});

router.delete('/:id/delete', function (req, res) {
    User.findByIdDelete(req.params.id, function (err, user) {
        if (err)
            res.status(400).send(err)

        else
            res.send(user);
    });
});

app.use('/user', userRoutes);