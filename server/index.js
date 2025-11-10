import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import newsRoutes from "./routes/news.js";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comments.js";
import categoryRoutes from "./routes/categories.js";

const app = express();
const PORT = 3001;

// Resolve project root so we can serve the public folder reliably
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Serve files from the project's public folder so uploaded images written to
// <projectRoot>/public/galeri are accessible via HTTP (e.g. /galeri/1.jpg)
app.use(express.static(path.join(projectRoot, "public")));

app.use("/api/news", newsRoutes);

app.use("/api/", userRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/categories", categoryRoutes);

// Route untuk root
app.get("/", (req, res) => {
  res.send("Backend API berjalan! Silakan akses endpoint /api/news, /api/user, dll.");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
