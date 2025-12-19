const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Jimp = require("jimp");
const QrCode = require("qrcode-reader");
const Scan = require("../models/Scan");
const auth = require("../middleware/auth");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("qrImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = await Jimp.read(req.file.path);
    const qr = new QrCode();

    qr.callback = async (err, value) => {
      fs.unlinkSync(req.file.path);

      if (err || !value) {
        return res.status(400).json({ message: "QR not detected" });
      }

      const scan = await Scan.create({
        userId: req.userId,
        qrValue: value.result
      });

      return res.json({ qrValue: scan.qrValue });
    };

    qr.decode(image.bitmap);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "QR scanning failed" });
  }
});

router.get("/history", auth, async (req, res) => {
  const scans = await Scan.find({ userId: req.userId }).sort({ scannedAt: -1 });
  res.json(scans);
});

module.exports = router;
