import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
        SELECT
            news.id,
            news.title,
            news.excerpt,
            news.image,
            news.detail,
            GROUP_CONCAT(categories.name) AS categories,
            SUBSTRING_INDEX(GROUP_CONCAT(categories.name), ',', 1) AS category
        FROM news
        JOIN news_categories ON news.id = news_categories.news_id
        JOIN categories ON news_categories.category_id = categories.id
        GROUP BY news.id
        ORDER BY news.id DESC
        `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { title, excerpt, image, detail, categories, userId } = req.body;

  if (!title || !excerpt || !image || !detail || !categories || !categories.length) {
    return res.status(400).json({ error: "Semua field wajib diisi." });
  }

  // Basic server-side admin check: ensure the userId belongs to an admin
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: userId is required" });
  }

  try {
    const [userRows] = await db.execute("SELECT is_admin FROM users WHERE id = ?", [userId]);
    const user = userRows && userRows[0];
    if (!user || Number(user.is_admin) !== 1) {
      return res.status(403).json({ error: "Hanya admin yang dapat menambahkan berita." });
    }
    // 1. Masukkan berita ke tabel `news`
    const [result] = await db.execute(
      "INSERT INTO news (title, excerpt, image, detail) VALUES (?, ?, ?, ?)",
      [title, excerpt, image, detail]
    );

    const newsId = result.insertId;

    // 2. Ambil ID kategori berdasarkan nama, lalu simpan ke tabel `news_categories`
    for (const catName of categories) {
      const [[cat]] = await db.execute("SELECT id FROM categories WHERE name = ?", [catName]);
      if (cat) {
        await db.execute(
          "INSERT INTO news_categories (news_id, category_id) VALUES (?, ?)",
          [newsId, cat.id]
        );
      }
    }

    res.json({ message: "Berita berhasil ditambahkan.", id: newsId });
  } catch (err) {
    console.error("Gagal tambah berita:", err);
    res.status(500).json({ error: "Gagal menambahkan berita." });
  }
});

// GET detail berita berdasarkan ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(`
      SELECT
          news.id,
          news.title,
          news.excerpt,
          news.image,
          news.detail,
          GROUP_CONCAT(categories.name) AS categories
      FROM news
      LEFT JOIN news_categories ON news.id = news_categories.news_id
      LEFT JOIN categories ON news_categories.category_id = categories.id
      WHERE news.id = ?
      GROUP BY news.id
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Berita tidak ditemukan" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (update) berita
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, image, detail, categories, userId } = req.body;

  if (!title || !excerpt || !image || !detail || !categories || !categories.length) {
    return res.status(400).json({ error: "Semua field wajib diisi." });
  }

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: userId is required" });
  }

  try {
    // Check if user is admin
    const [userRows] = await db.execute("SELECT is_admin FROM users WHERE id = ?", [userId]);
    const user = userRows && userRows[0];
    if (!user || Number(user.is_admin) !== 1) {
      return res.status(403).json({ error: "Hanya admin yang dapat mengedit berita." });
    }

    // Check if news exists
    const [newsRows] = await db.execute("SELECT id FROM news WHERE id = ?", [id]);
    if (newsRows.length === 0) {
      return res.status(404).json({ error: "Berita tidak ditemukan" });
    }

    // Update berita
    await db.execute(
      "UPDATE news SET title = ?, excerpt = ?, image = ?, detail = ? WHERE id = ?",
      [title, excerpt, image, detail, id]
    );

    // Delete old categories
    await db.execute("DELETE FROM news_categories WHERE news_id = ?", [id]);

    // Insert new categories
    for (const catName of categories) {
      const [[cat]] = await db.execute("SELECT id FROM categories WHERE name = ?", [catName]);
      if (cat) {
        await db.execute(
          "INSERT INTO news_categories (news_id, category_id) VALUES (?, ?)",
          [id, cat.id]
        );
      }
    }

    res.json({ message: "Berita berhasil diperbarui." });
  } catch (err) {
    console.error("Gagal update berita:", err);
    res.status(500).json({ error: "Gagal memperbarui berita." });
  }
});

// DELETE berita
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: userId is required" });
  }

  try {
    // Check if user is admin
    const [userRows] = await db.execute("SELECT is_admin FROM users WHERE id = ?", [userId]);
    const user = userRows && userRows[0];
    if (!user || Number(user.is_admin) !== 1) {
      return res.status(403).json({ error: "Hanya admin yang dapat menghapus berita." });
    }

    // Check if news exists
    const [newsRows] = await db.execute("SELECT id FROM news WHERE id = ?", [id]);
    if (newsRows.length === 0) {
      return res.status(404).json({ error: "Berita tidak ditemukan" });
    }

    // Delete from news_categories
    await db.execute("DELETE FROM news_categories WHERE news_id = ?", [id]);

    // Delete news
    await db.execute("DELETE FROM news WHERE id = ?", [id]);

    res.json({ message: "Berita berhasil dihapus." });
  } catch (err) {
    console.error("Gagal hapus berita:", err);
    res.status(500).json({ error: "Gagal menghapus berita." });
  }
});

export default router;
