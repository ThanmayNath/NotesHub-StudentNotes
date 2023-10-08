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
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const q = "SELECT * FROM user_post WHERE u_id = ?";
    const data = await new Promise((resolve, reject) => {
      db.query(q, [id], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const noteId = req.params.id;
    const q =
      "UPDATE user_post SET `title`= ?, `desc`= ?, `file_id`= ? WHERE id = ?";

    const values = [req.body.title, req.body.desc, req.file.path];
    const data = await new Promise((resolve, reject) => {
      db.query(q, [...values, noteId], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const q = " DELETE FROM user_post WHERE id = ? ";
    const data = await new Promise((resolve, reject) => {
      db.query(q, [noteId], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
