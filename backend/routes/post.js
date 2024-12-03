const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User")

// create post
router.post("/", async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(200).send(savedPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update post
router.put("/:id", async (req , res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set : req.body
      });
      res.status(200).send("updated success")
    } else {
      res.status(401).send("you can update only your post");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete post
router.delete('/:id' ,async (req , res)=>{
    try {
        const post =  await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).send("deleted succesful");
        } else {
            res.status(200).send("you can delete just you post");
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

// like / dislike post
router.put('/:id/like' , async (req , res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post.like.includes(req.body.userId)) {
            await post.updateOne({$push : {like : req.body.userId}});
            res.status(200).send("post liked");
        }else{
          await post.updateOne({$pull : {like : req.body.userId}});
          res.status(200).send("post disliked");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// get a post 
router.get('/:id' ,async (req , res)=>{
  try {
    const post = await Post.findById(req.params.id);
    const {updatedAt , ...other} = post._doc ;
    res.status(200).send(other);
  } catch (error) {
    res.status(400).send(error);
  }
});

// timeline - get all posts

router.get("/timeline/:userId" ,async (req , res)=>{
  try {
    const currentUser =  await User.findById(req.params.userId);
    const UserPosts = await Post.find({userId : currentUser._id});
    const FriendsPosts = await Promise.all(
      currentUser.following.map(frienId =>{
        return Post.find({userId : frienId})
      })
    );

    res.status(200).send(UserPosts.concat(...FriendsPosts));
  } catch (error) {
    res.status(400).send(error);
  }
});

// get user's posts for profile
router.get("/profile/:username" ,async (req , res)=>{
  try {
    const user = await User.findOne({username : req.params.username});
    const posts = await Post.find({userId : user._id});
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router;
