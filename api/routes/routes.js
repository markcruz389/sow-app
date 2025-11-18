const express = require("express");
const prisma = require("../lib/prisma");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const router = express.Router();

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
}

router.get("/health", (req, res) => {
  res.send({ status: "OK" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password_hash: true, salt: true },
    });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const hash = hashPassword(password, user.salt);
    if (hash !== user.password_hash) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
