const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post('/signup',async (req , res) => {
  try{
    data = req.body

    let salt = await bcrypt.genSalt(10);
    let cryptedPass = await bcrypt.hash(data.pass , salt);
    data.pass = cryptedPass ;
    usr = new User(data);
    let Saving = await usr.save();
    res.send(Saving);

  }catch(err){
    console.log(err)
  }
});

router.post('/login' ,async (req , res) =>{
  try {
    const user = await User.findOne({email : req.body.email});
    !user && res.status(404).send('Your Email or Password Incorrect !');

    const ValidPass = await bcrypt.compare(req.body.pass , user.pass);
    !ValidPass && res.status(404).send('Your Email or Password Incorrect !');

    res.status(200).send(user)
  } catch (error) {
    console.log(error);
  }
})




module.exports = router;
