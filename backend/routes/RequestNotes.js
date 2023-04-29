import { Router } from "express";
const router = Router();
import db from "../db/config.js";
import verifyJWT from "../Token/jwt.js";

router.get("/", verifyJWT, async (req, res) => {
  try {
    const q = "SELECT * FROM user_request";
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
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

router.post("/add", async (req, res) => {
  try {
    const q = "INSERT INTO user_request(`user_id`,`req_notes`) VALUES (?)";
    console.log(req.body.content);
    console.log(req.body.user);
    const values = [req.body.user, req.body.content];
    const data = await new Promise((resolve, reject) => {
      db.query(q, [values], (err, data) => {
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
