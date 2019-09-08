const express = require('express');
const connectDB = require('./config/db');

const users = require('./routes/users');
const profile = require('./routes/profile');
const posts = require('./routes/posts');
const login = require('./routes/login');

const app = express();

connectDB();

app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

app.use('/user', users);
app.use('/user/login', login);
app.use('/profile', profile);
app.use('/post', posts);


const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Server strated on port ${PORT}`));