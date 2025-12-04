import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";

const EditNews = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const newsId = searchParams.get("id");

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");

    if (!userData) {
      alert("Silakan login terlebih dahulu untuk mengakses halaman ini.");
      navigate("/", { replace: true });
      return;
    }

    const user = JSON.parse(userData);

    // Normalize is_admin because it may come as number, string or boolean from the server/DB
    const isAdmin = Number(user.is_admin) === 1 || user.is_admin === true;

    if (!isAdmin) {
      alert("Maaf, hanya admin yang dapat mengakses halaman ini.");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [detail, setDetail] = useState("");
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  // Ambil data kategori
  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then(res => res.json())
      .then(data => setAllCategories(data.map((d: any) => d.name)))
      .catch(() => setAllCategories([]));
  }, []);

  // Ambil data berita berdasarkan ID
  useEffect(() => {
    if (!newsId) {
      setError("ID berita tidak ditemukan");
      setIsLoadingNews(false);
      return;
    }

    fetch(`http://localhost:3001/api/news/${newsId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setTitle(data.title);
          setExcerpt(data.excerpt);
          setImage(data.image);
          setDetail(data.detail);
          // Parse kategori dari string yang dipisahkan koma
          const categories = data.categories ? data.categories.split(",").map((c: string) => c.trim()) : [];
          setSelectedCategories(categories);
        }
      })
      .catch(() => setError("Gagal memuat data berita"))
      .finally(() => setIsLoadingNews(false));
  }, [newsId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !excerpt || !image || !detail || selectedCategories.length === 0) {
      setError("Semua field wajib diisi!");
      return;
    }

    setLoading(true);
    const userData = localStorage.getItem("currentUser");
    const user = userData ? JSON.parse(userData) : null;

    const payload = { title, excerpt, image, detail, categories: selectedCategories, userId: user?.id };

    const res = await fetch(`http://localhost:3001/api/news/${newsId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Berita berhasil diperbarui!");
      navigate("/");
    } else {
      setError(data.error || "Terjadi kesalahan.");
    }
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  if (isLoadingNews) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6 text-center">
          <p>Memuat data berita...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 bg-white/90 shadow rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4"><span className="bg-amber-400 text-white px-3 py-1 rounded">Edit Berita</span></h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Judul"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border px-3 py-2 rounded"
            placeholder="Kutipan"
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
          />
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="URL Gambar"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <textarea
            className="w-full border px-3 py-2 rounded"
            placeholder="Isi berita detail (gunakan \\n\\n untuk paragraf)"
            rows={8}
            value={detail}
            onChange={e => setDetail(e.target.value)}
          />
          <div>
            <label className="font-semibold">Kategori:</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {allCategories.map((cat, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    selectedCategories.includes(cat)
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditNews;
