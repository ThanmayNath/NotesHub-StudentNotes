import express from "express";
import cors from "cors";
import multer from "multer";
import jwt from "jsonwebtoken";
import db from "./db/config.js";
import reqNotesRoute from "./routes/RequestNotes.js";
import userProfileRoute from "./routes/UserProfile.js";
import adminRoute from "./routes/admin.js";
import loginRoute from "./routes/Login.js";
import registerRoute from "./routes/register.js";
import homeRoute from "./routes/home.js";
import addNotesRoute from "./routes/addNotes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));
app.use("/uploads", express.static("./uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Need Token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to auth" });
      } else {
        req.userID = decoded.id;
        next();
      }
    });
  }
};

app.use("/reqnotes", reqNotesRoute);
app.use("/profile", userProfileRoute);
app.use("/admin", adminRoute);
app.use("/log", loginRoute);
app.use("/reg", registerRoute);
app.use("/home", homeRoute);
app.use("/add", addNotesRoute);

app.listen(8800, () => {
  console.log("Backend is connect");
});
