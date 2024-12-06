const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
const UserRoute = require('./routes/user');
const AuthRoute = require('./routes/auth');
const PostRoute = require('./routes/post');
const multer = require("multer");
const path = require("path");
const Post = require("./models/Post")

dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors()) 


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null , "public/images");
    },
    filename : (req ,file , cb)=>{
        cb(null , file.originalname)
    }
})

const upload = multer({storage});

app.post("/upload" , upload.single("file") ,async (req ,res)=>{
    try {        
        res.status(200).send("upload success !")
    } catch (error) {
        console.log(error)
    }
});

app.use("/images" , (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
}, express.static(path.join(__dirname , "public/images")))


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