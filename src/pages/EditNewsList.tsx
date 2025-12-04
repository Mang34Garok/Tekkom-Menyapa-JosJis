import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

interface News {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  detail: string;
  categories: string;
}

const EditNewsList = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");

    if (!userData) {
      alert("Silakan login terlebih dahulu untuk mengakses halaman ini.");
      navigate("/", { replace: true });
      return;
    }

    const user = JSON.parse(userData);
    const isAdmin = Number(user.is_admin) === 1 || user.is_admin === true;

    if (!isAdmin) {
      alert("Maaf, hanya admin yang dapat mengakses halaman ini.");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Ambil data berita
  useEffect(() => {
    fetch("http://localhost:3001/api/news")
      .then(res => res.json())
      .then(data => {
        setNewsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Gagal memuat data berita");
        setLoading(false);
      });
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/edit-news?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      return;
    }

    const userData = localStorage.getItem("currentUser");
    const user = userData ? JSON.parse(userData) : null;

    try {
      const res = await fetch(`http://localhost:3001/api/news/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Berita berhasil dihapus!");
        setNewsList(newsList.filter(news => news.id !== id));
      } else {
        alert(data.error || "Gagal menghapus berita");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus berita");
    }
  };

  // Filter berita berdasarkan search term
  const filteredNews = newsList.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto p-6 text-center">
          <p>Memuat data berita...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            <span className="bg-amber-400 text-white px-3 py-1 rounded">Kelola Berita</span>
          </h2>
          <button
            onClick={() => navigate("/add-news")}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
          >
            + Tambah Berita
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari berita berdasarkan judul atau kutipan..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* News List */}
        {filteredNews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Tidak ada berita ditemukan
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Judul</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kutipan</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kategori</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((news) => (
                  <tr key={news.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 line-clamp-1">{news.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700 text-sm line-clamp-2">{news.excerpt}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {news.categories ? (
                          news.categories.split(",").map((cat, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
                            >
                              {cat.trim()}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(news.id)}
                          className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(news.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditNewsList;
