// 📄 routes/cloudinary.js
import express from "express";
import crypto from "crypto";
import "dotenv/config";

const router = express.Router();

router.get("/signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const stringToSign = `timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(stringToSign + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
});

export default router;
