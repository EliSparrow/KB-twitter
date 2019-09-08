const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

const connectDB = require('./config/db');

let port = process.env.PORT || 4242;

// connect db
connectDB();

mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {

    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin)
      return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));

const users = require('./routes/users');
const profile = require('./routes/profile');
const posts = require('./routes/posts');
const login = require('./routes/login');

app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

app.use('/user', users);
app.use('/user/login', login);
app.use('/profile', profile);
app.use('/post', posts);

app.listen(port, () => console.log(`Server strated on port ${port}`));