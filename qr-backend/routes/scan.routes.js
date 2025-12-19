const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const jsQR = require("jsqr");
const Scan = require("../models/Scan");
const auth = require("../middleware/auth");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("qrImage"), async (req, res) => {
  try {
    const image = await loadImage(req.file.path);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);

    const qrCode = jsQR(imageData.data, image.width, image.height);

    fs.unlinkSync(req.file.path);

    if (!qrCode) {
      return res.status(400).json({ message: "QR not detected" });
    }

    const scan = await Scan.create({
      userId: req.userId,
      qrValue: qrCode.data
    });

    res.json({ qrValue: scan.qrValue });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "QR scanning failed" });
  }
});

router.get("/history", auth, async (req, res) => {
  const scans = await Scan.find({ userId: req.userId })
    .sort({ scannedAt: -1 });

  res.json(scans);
});

module.exports = router;
