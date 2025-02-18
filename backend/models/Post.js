import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    userId : {
        type : String ,
        require : true
    },
    desc : {
        type : String ,
    },
    img : {
        type : String
    },
    like : {
        type : Array ,
        default : [] 
    }
},
{timestamps : true}
);

const Post = mongoose.model('Post' , PostSchema);
export default Post ;