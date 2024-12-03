const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username : {
        type : String ,
        require : true ,
        min : 6 ,
        max :20 ,
        unique : true 
    },
    email : {
        type :String ,
        require : true ,
        unique : true
    },
    pass : {
        type : String ,
        min : 6
    },
    profilPic : {
        type : String ,
        default : ''
    },
    coverPic : {
        type : String ,
        default : ''
    },
    followers : {
        type : Array ,
        default : []
    },
    following : {
        type : Array ,
        default : []
    },
    isAdmin : {
        type : Boolean ,
        default : false
    },
    bio : {
        type : String ,
        max : 100 
    },
    city : {
        type : String ,
        max : 40
    },
    from : {
        type : String ,
        max : 40
    },
    relationship : {
        type : String ,
        enum : [1,2,3]
    }
} , {timestamps : true}); 

module.exports = mongoose.model('User' , UserSchema);