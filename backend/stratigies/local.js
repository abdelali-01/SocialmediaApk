import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { optGenerator } from "../utils/otp.js";
import emailVerificationSender from "../utils/Transporter.js";

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("user not found !");

    done(null, findUser);
  } catch (error) {
    console.error("error durign deserialize user ", error);
    done(error, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "pass" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) throw new Error("Username Not Exist !");

        // compare password
        const compare = await bcrypt.compare(password, user.pass);
        if (!compare) throw new Error("Invalid Credintials !");

        // test if the user is verified or not
        if (!user.verified) {
          if (Date.now() > user.otpExpires)
            user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

          user.otp = optGenerator();
          await user.save();

          // Send the OTP via email (wrapped in try-catch)
          try {
            await emailVerificationSender(user.email, user.otp);
            done(null, user, {
              message: "your Email is not verified , please check your email !",
            });
          } catch (emailError) {
            console.error("Email sending failed:", emailError);
            return done(emailError, null, {
              message:
                "User created, but email could not be sent. Try again later.",
            });
          }
        }

        done(null, user);
      } catch (error) {
        console.error("error during user login in local stratigy", error);
        done(error, null);
      }
    }
  )
);

export default passport;
