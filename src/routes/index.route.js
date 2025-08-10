import express from "express";

const router = express.Router();

router.get("/", function (_, res) {
  return res.render('index')
});

export default router;
