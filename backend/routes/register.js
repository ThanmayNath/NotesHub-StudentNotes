import { Router } from "express";
const router = Router();
import db from "../db/config.js";

router.post("/", async (req, res) => {
  try {
    const q =
      "INSERT INTO user_profile(`u_name`,`email_address`, `password`) VALUES (?)";
    const values = [req.body.u_name, req.body.email, req.body.password];
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
