import { Router } from "express";
const router = Router();
import db from "../db/config.js";
import verifyJWT from "../Token/jwt.js";

router.get("/", verifyJWT, async (req, res) => {
  try {
    const q = "SELECT * FROM user_post";
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
