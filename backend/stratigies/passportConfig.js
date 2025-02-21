import passport from "passport";
import User from "../models/User.js";

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

export default passport;
