const express = require('express');
const connectDB= require('./config/db');


const app = express();

connectDB();

app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

app.use('/user', require('./routes/api/users'));
app.use('/login', require('./routes/api/login'));
app.use('/profile', require('./routes/api/profile'));
//app.use('/post', require('./routes/post'));


const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Server strated on port ${PORT}`));