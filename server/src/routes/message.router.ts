import express from "express";

const router = express.Router();

router.get("/conservations", (req, res) => {
  res.send("Conservation route");
});

export default router;
