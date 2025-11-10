// routes/user.js
import multer from "multer";
import fs from "fs";
import express from "express";
import db from "../db.js";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const upload = multer({ storage: multer.memoryStorage() });
// Resolve project root reliably and the public/galeri folder so uploads work
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..", "..");
const galeriDir = path.join(projectRoot, "public", "galeri");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(400).json({ error: "Email tidak ditemukan" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password salah" });
    }
    
  const filename = `${user.id}.jpg`; // atau bisa juga cek png jika perlu
  const photoPath = path.join(galeriDir, filename);
  const photoExists = fs.existsSync(photoPath);

    res.status(200).json({
      message: "Login berhasil",
      user: {
      id: user.id,
      is_admin: user.is_admin,
      photo: photoExists ? `/galeri/${user.id}.jpg` : null, // lokasi photo di folder publik/galeri/
      phone: user.phone,
      fullName: user.full_name,
      email: user.email
      }
    });
  } catch (err) {
    console.error("❌ Error saat login:", err);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});


router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Cek apakah email sudah digunakan
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email sudah terdaftar" });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    await db.query(
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
      [fullName, email, hashedPassword]
    );

    res.status(201).json({ message: "Akun berhasil dibuat!" });
  } catch (err) {
    console.error("❌ Error saat signup:", err);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});



// Update user
router.put("/update", async (req, res) => {
  const {userId, email, fullName, phone} = req.body;

  try {
    // Update data user
    await db.query(
  "UPDATE users SET full_name = ?, phone = ? ,email = ? WHERE id = ?",
  [fullName, phone || "", email, userId]
);

    res.status(200).json({ message: "Profil berhasil diperbarui" });
  } catch (err) {
    console.error("❌ Error saat update profil:", err);
    res.status(500).json({ error: "Gagal memperbarui profil" });
  }
});

router.post("/upload-photo", upload.single("photo"), async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) return res.status(400).json({ error: "File tidak ditemukan" });
    if (!userId) return res.status(400).json({ error: "User ID tidak ada" });

  // Ensure target directory exists
  await fs.promises.mkdir(galeriDir, { recursive: true });
  const outputPath = path.join(galeriDir, `${userId}.jpg`);

    await sharp(req.file.buffer)
      .resize(300, 300) // opsional
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`Saved uploaded photo to: ${outputPath}`);

    // Try to ensure `photo` column exists, then save photo path to DB
    try {
      // Some MySQL versions support IF NOT EXISTS; wrap in try/catch to be safe
      await db.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS photo VARCHAR(255) DEFAULT NULL");
    } catch (err) {
      // If ALTER TABLE with IF NOT EXISTS not supported, try without IF NOT EXISTS
      try {
        await db.query("ALTER TABLE users ADD COLUMN photo VARCHAR(255) DEFAULT NULL");
      } catch (e) {
        // ignore if column already exists or other alter errors
        console.warn("Could not ensure photo column exists:", e?.message || e);
      }
    }

    try {
      await db.query("UPDATE users SET photo = ? WHERE id = ?", [`/galeri/${userId}.jpg`, userId]);
    } catch (err) {
      console.error("❌ Gagal menyimpan path foto ke database:", err);
      // proceed — file was saved; respond with photo path but inform about DB issue
      return res.status(500).json({ error: "Foto diupload, tapi gagal menyimpan ke database" });
    }

    res.json({ message: "Foto berhasil diupload", photo: `/galeri/${userId}.jpg` });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Gagal upload foto" });
  }
});


export default router;
