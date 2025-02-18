import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import UserRoute from "./routes/user.js";
import AuthRoute from "./routes/auth.js";
import PostRoute from "./routes/post.js";
import { fileURLToPath } from "url";

import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

const app = express();
dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/social").then(() => {
  app.listen(3010, () => {
    console.log("server running !");
  });
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use(cookieParser());
app.use(
  session({
    secret: "my complex secret key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
      // sameSite : "none" // >>> work just with true secure
    },

    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

// setup the passport library
import "./stratigies/local.js";
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    res.status(200).send("upload success !");
  } catch (error) {
    console.log(error);
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  "/images",
  // (req, res, next) => {
  //   res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  //   next();
  // },
  express.static(path.join(__dirname, "public/images"))
);

app.use("/user", UserRoute);
app.use("/auth", AuthRoute);
app.use("/post", PostRoute);
