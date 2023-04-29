import { Router } from "express";
const router = Router();
import db from "../db/config.js";
import verifyJWT from "../Token/jwt.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    //console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("add notes yes");
    const q =
      "INSERT INTO user_post(`u_id`,`title`, `desc`, `file_id`) VALUES (?)";
    console.log(req.body.user);
    //console.log(req.file.path);
    const values = [
      req.body.user,
      req.body.title,
      req.body.desc,
      req.file.path,
    ];
    db.query(q, [values], (err, data) => {
      if (err) res.status(500);
      res.status(200).json(data);
    });
    /*console.log(values);
    const data = await new Promise((resolve, reject) => {
      db.query(q, [values], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    return res.status(200).json(data);*/
  } catch (error) {
    console.log(error);
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
