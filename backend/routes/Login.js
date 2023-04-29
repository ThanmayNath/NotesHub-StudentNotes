import { Router } from "express";
const router = Router();
import db from "../db/config.js";
import jwt from "jsonwebtoken";

router.post("/", async (req, res) => {
  try {
    const q =
      "SELECT * FROM user_profile WHERE password = ? AND email_address = ?";
    const password = req.body.password;
    const email = req.body.email;
    const data = await new Promise((resolve, reject) => {
      db.query(q, [password, email], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    if (data.length > 0) {
      console.log(data);
      const uid = data[0].user_id;
      const un = data[0].u_name;
      const token = jwt.sign({ uid, un }, "jwtSecret", {
        expiresIn: 86400,
      });
      return res.status(200).json({
        auth: true,
        token: token,
        data: data,
        uid: data[0].user_id,
        uname: data[0].u_name,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
