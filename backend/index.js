const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const UserRoute = require('./routes/user');
const AuthRoute = require('./routes/auth');
const PostRoute = require('./routes/post');


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));


app.use('/user' , UserRoute)
app.use('/auth' , AuthRoute)
app.use('/post' , PostRoute)



mongoose.connect('mongodb://127.0.0.1:27017/social' ).then(
    ()=>{
        app.listen(3010 , ()=>{
            console.log('server running !')
        })
    }
);