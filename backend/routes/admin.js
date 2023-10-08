import { Router } from "express";
const router = Router();
import db from "../db/config.js";
//import verifyJWT from "../Token/jwt.js";

router.get("/", async (req, res) => {
  try {
    const q = "SELECT * FROM user_post WHERE report = 1";
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

router.put("/:id", async (req, res) => {
  try {
    const noteId = Number(req.params.id);
    const q = "UPDATE user_post SET report=? WHERE id = ?";
    const value = 0;
    const data = await new Promise((resolve, reject) => {
      db.query(q, [value, noteId], (err, data) => {
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
