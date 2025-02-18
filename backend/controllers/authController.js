import User from "../models/User.js";
import bcrypt from "bcrypt";
import emailVerificationSender from "../utils/Transporter.js";
import { optGenerator } from "../utils/otp.js";

const signup = async (req, res) => {
  const data = req.body;
  try {
    // Hash the password
    let salt = await bcrypt.genSalt(10);
    let cryptedPass = await bcrypt.hash(data.pass, salt);

    // Create the user with OTP and expiration time
    const user = new User({
      username: data.username,
      email: data.email,
      pass: cryptedPass,
      otp: optGenerator(), // Store hashed OTP
      otpExpires: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
      verified: false,
    });

    // Save the user in the database
    await user.save();

    // Send the OTP via email (wrapped in try-catch)
    try {
      await emailVerificationSender(data.email, user.otp);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return res.status(500).send({
        message: "User created, but email could not be sent. Try again later.",
      });
    }

    // Respond back with success message
    res.status(201).send({ message: "User created, verification email sent." });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Error during signup." });
  }
};

const userVerification = async (req , res) => {
  const {otp} = req.body ;
  const userId = req.session.passport.user ;
  if(!userId) return res.status(401).send('You Have to Login !');

  try {
    const findUser = await User.findById(userId);
    if(!findUser) return res.status(404).send('user not fount !');

    // compare the otp
    if (otp !== findUser.otp) return res.status(401).send('invalid OTP !');
    findUser.otp = null ;
    findUser.verified = true ;

    await findUser.save();
    res.status(200).send("Your Account has been verified successfuly");
  } catch (error) {
    console.error('error during verify the user ' , error);
    res.sendStatus(400);
  }
}

export default { signup , userVerification};
