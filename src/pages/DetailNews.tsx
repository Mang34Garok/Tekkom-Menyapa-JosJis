import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getCategoryColor } from "../utils/color"; // atau "../../utils/color" tergantung lokasi file


const DetailNews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const news = location.state?.news;

  if (!news) {
    // Jika tidak ada data, kembali ke halaman utama
    navigate("/", { replace: true });
    return null;
  }

  // Contoh detail panjang untuk setiap kategori
  

  // State untuk page detail berita
  const [detailPage, setDetailPage] = useState(0);
  const detail = news.detail;
const detailPages =
  typeof detail === "string" && detail.trim()
    ? detail.split("\n\n")
    : ["Detail berita belum tersedia."];


  



  // Komentar
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) setUser(JSON.parse(userData));

    fetch(`http://localhost:3001/api/comments/by-news-id/${news.id}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(() => setComments([]));
  }, [news.title]);



  const handleAddComment = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user || !commentText.trim()) return;

  const newComment = {
  news_id: news.id,
  user_id: user.id,
  comment: commentText,
};


  const res = await fetch("http://localhost:3001/api/comments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newComment),
});

console.log("user:", user);
console.log("commentText:", commentText);

  if (res.ok) {
    const body = await res.json();
    // If server returned the created comment with user info, use it.
    if (body && body.comment) {
      setComments(prev => [...prev, body.comment]);
    } else {
      // Fallback: optimistic UI - include current user's name/photo
      setComments(prev => [...prev, {
        ...newComment,
        user_name: user.fullName,
        user_photo: user.photo || null,
        created_at: new Date().toISOString()
      }]);
    }
    setCommentText("");
  }
};


  const handleDeleteComment = async (index: number) => {
  if (!user) return;

  const comment = comments[index];
  if (comment.user_name !== user.fullName) return;

  const res = await fetch(`http://localhost:3001/api/comments/${comment.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: user.id })
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.error || "Gagal menghapus komentar.");
    return;
  }

  setComments(prev => prev.filter((_, i) => i !== index));
};


  return (
    <Layout>
      <div className="min-h-screen news-background flex items-center justify-center py-12 px-4">
  <div className="max-w-2xl w-full bg-white/80 dark:bg-slate-900/70 rounded-lg shadow-2xl p-8 border border-amber-200/40 backdrop-blur-md">
          <img src={news.image} alt={news.title} className="w-full max-h-[60vh] object-contain rounded-lg mb-6 bg-gray-50 dark:bg-slate-800" />
          <div className="flex flex-wrap gap-2 mb-2">
  {news.categories.map((cat: string, index: number) => (
    <span
      key={index}
      className={`text-sm font-medium ${getCategoryColor(cat)} bg-gray-100 px-2 py-1 rounded-full`}
    >
      {cat}
    </span>
  ))}
</div>

          <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-4">{news.title}</h1>
          <p className="text-gray-600 mb-6">{news.excerpt}</p>
          <div className="text-gray-700 mb-8 whitespace-pre-line">
            {detailPages[detailPage]}
          </div>
          {/* Navigasi page detail */}
          {detailPages.length > 1 && (
            <div className="flex justify-center gap-2 mb-6">
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setDetailPage(p => Math.max(0, p - 1))}
                disabled={detailPage === 0}
              >Sebelumnya</button>
              <span className="text-sm text-gray-500">Page {detailPage + 1} of {detailPages.length}</span>
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setDetailPage(p => Math.min(detailPages.length - 1, p + 1))}
                disabled={detailPage === detailPages.length - 1}
              >Selanjutnya</button>
            </div>
          )}
          {/* Komentar */}
          <div className="mt-8">
            <h3 className="font-semibold mb-2 text-lg">Komentar</h3>
            {comments.length === 0 && <div className="text-gray-400 text-sm mb-2">Belum ada komentar.</div>}
            {comments.map((c, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <img
                  src={
                    // priority: user_photo (from DB), then comment.user_photo (dataURL), then public/galeri by id
                    c.user_photo || c.user_photo || `/galeri/${c.user_id}.jpg`
                  }
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                  alt={c.user_name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-xs font-semibold">{c.user_name}</div>
                  <div className="text-xs text-gray-700">{c.comment}</div>
                  <div className="text-[10px] text-gray-400">{new Date(c.created_at).toLocaleString()}</div>
                </div>
                {user && c.user_name === user.fullName && (
                  <button
                    className="ml-2 text-xs text-red-600 hover:underline"
                    onClick={() => handleDeleteComment(i)}
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))}
            {user ? (
              <form className="mt-2 flex gap-2 items-center" onSubmit={handleAddComment}>
                {user.photo ? (
                  <img src={user.photo} alt={user.fullName} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-base text-gray-500">{user.fullName ? user.fullName[0] : "?"}</div>
                )}
                <input
                  type="text"
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  placeholder="Tulis komentar..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  maxLength={200}
                  required
                />
                <button type="submit" className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Kirim</button>
              </form>
            ) : (
              <div className="mt-2 text-sm text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>Login untuk berkomentar</div>
            )}
          </div>
          <button onClick={() => navigate(-1)} className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors mt-8">Kembali</button>
        </div>
      </div>
    </Layout>
  );
};

export default DetailNews;
