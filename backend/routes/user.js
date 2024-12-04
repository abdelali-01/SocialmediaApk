const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User");

// update profile
router.put('/:id' ,async (req,res)=>{
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.pass){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.pass = await bcrypt.hash(req.body.pass , salt); 
            } catch (error) {
                return res.status(400).send(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id , {
                $set : req.body
            });
            res.status(200).send('Profile updated');
        } catch (error) {
            return res.status(400).send(error)
        }
    } else {
        return res.status(401).send("you can update only your profile");
    }
});

// delete user 

router.delete('/:id' , async (req , res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send("delete success");
        } catch (error) {
            res.send(400).send(error);
        }
    }else{
        res.status(401).send("you can delete only your profile")
    }
});

//get user 
router.get('/' ,async (req , res) =>{
    const userId = req.query.userId ; 
    const username = req.query.username ; // it's mean the url it's gonna be like this >> /user?username=abdelali 
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username : username});
        const {pass , updatedAt , ...other} = user._doc ;
        user ? res.status(200).send(other) : res.status(200).send("user not found !");
    } catch (error) {
        res.status(400).send(error);
    }
});

// follow a user 

router.put('/:id/follow' ,async (req ,res)=>{
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push : {followers : req.body.userId}});
                await currentUser.updateOne({$push : {following : req.params.id}});

                res.status(200).send("account has been followed ")
            } else {
                res.status(200).send("you are already following this user");
            }
        } catch (error) {
            res.send(400).send(error)
        }
    } else {
        res.status(401).send("You can't follow youself !")
    }
});

// unfollow user 

router.put('/:id/unfollow' ,async (req ,res)=>{
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull : {followers : req.body.userId}});
                await currentUser.updateOne({$pull : {following : req.params.id}});

                res.status(200).send("account has been unfollowed");
            } else {
                res.status(200).send("you already don't follw this user");
            }
        } catch (error) {
            res.send(400).send(error);
        }
    } else {
        res.status(401).send("You can't follow youself !");
    }
});

module.exports = router ;