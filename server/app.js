const express = require('express');
const connectDB= require('./config/db');


const app = express();

connectDB();

app.get('/', (req, res) => res.send('API Runnig'));

app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/profile', require('./routes/profile'));
//app.use('/post', require('./routes/post'));


const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Server strated on port ${PORT}`));