import React, { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout";
import NewsCard from "../components/NewsCard";
import FeaturedNewsGrid from "../components/FeaturedNewsGrid";
import NewsPagination from "../components/NewsPagination";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategoryColor } from "../utils/color"; // atau "../../utils/color" tergantung lokasi file

const ITEMS_PER_PAGE = 4;
const MAX_PAGES = 10;

const Index = () => {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const names = data.map((cat: any) => cat.name);
        setCategoryList(names);
      })
      .catch((err) => console.error("Gagal mengambil kategori:", err));
  }, []);
  // Efek untuk mengambil data dari API sekali saja saat komponen dimuat
  useEffect(() => {
    fetch('http://localhost:3001/api/news')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          ...item,
          // Pastikan categories selalu berupa array
          categories: typeof item.categories === "string"
            ? item.categories.split(',').map(cat => cat.trim())
            : Array.isArray(item.categories) ? item.categories : [],
        }));
        setNewsData(formattedData);
      })
      .catch(error => console.error("Gagal mengambil data berita:", error));
  }, []);

  // Efek untuk menyinkronkan state dengan URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const kategori = params.get("kategori");
    const search = params.get("search");

    if (kategori) {
      const cap = kategori.charAt(0).toUpperCase() + kategori.slice(1).toLowerCase();
      setSelectedCategory(cap);
    } else {
      setSelectedCategory("Semua");
    }
    setSearchTerm(search || "");
    setCurrentPage(1); // Reset halaman setiap kali query berubah
  }, [location.search]);


  const mapTagToCategory = (tag: string) => {
    const normalizedTag = tag.toLowerCase().replace('#', '');
    const matched = categoryList.find(cat =>
      cat.toLowerCase() === normalizedTag
    );
    return matched || normalizedTag;
  };

  // Gunakan useMemo untuk memfilter berita agar tidak dihitung ulang pada setiap render
  const filteredNews = useMemo(() => {
    let news = [...newsData];

    // 1. Filter berdasarkan kategori yang dipilih
    if (selectedCategory !== "Semua") {
      news = news.filter((item) =>
        item.categories.includes(selectedCategory)
      );
    }

    // 2. Filter berdasarkan search term (teks atau hashtag) dari hasil filter kategori
    if (searchTerm) {
      if (searchTerm.startsWith('#')) {
        const mappedCategory = mapTagToCategory(searchTerm);
        news = news.filter(item =>
          item.categories &&
          item.categories.some(cat => cat.toLowerCase() === mappedCategory.toLowerCase())
        );
      } else {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        news = news.filter((item) =>
          item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.excerpt.toLowerCase().includes(lowerCaseSearchTerm)
          // Hapus filter by item.category karena sudah ditangani oleh selectedCategory
        );
      }
    }

    return news;
  }, [newsData, selectedCategory, searchTerm]);


  // Logika paginasi
  const totalPages = Math.min(Math.ceil(filteredNews.length / ITEMS_PER_PAGE), MAX_PAGES);
  const paginatedNews = useMemo(() => {
    return filteredNews.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
  }, [filteredNews, currentPage]);


  // Rekomendasi berita (ambil dari hasil filter, bukan dari semua berita)
  const recommendedNews = useMemo(() => {
  const shuffled = [...newsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8);
}, [newsData]);



  // Handler untuk klik tag
  const handleTagClick = (tag: string) => {
    const cleanTag = tag.toLowerCase(); // Tidak perlu hapus # karena sudah dihandle di logic filter
    const params = new URLSearchParams(); // Buat params baru
    params.set('search', cleanTag);
    // Jika ingin mempertahankan kategori saat klik tag, tambahkan ini:
    if (selectedCategory !== 'Semua') {
      params.set('kategori', selectedCategory.toLowerCase());
    }
    navigate({ search: params.toString() });
  };
  
  // Sisa kode JSX tetap sama...
  // (Pastikan untuk mengganti `filteredNews` dengan `paginatedNews` di dalam `FeaturedNewsGrid` dan `recommendedNews` di sidebar)

  return (
      <Layout onCategoryChange={setSelectedCategory} selectedCategory={selectedCategory}>
  <div className="min-h-screen news-background">
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kolom Kiri */}
                <div className="lg:col-span-2">
                  <FeaturedNewsGrid newsList={paginatedNews} /> {/* Gunakan paginatedNews */}
                  {/* ... Sisa konten di kolom kiri ... */}
                   <div className="rounded-lg shadow-lg mt-6 p-6 bg-transparent">
                        {/* ... Konten statis ... */}
                        <NewsPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        />
                         {/* ... Fitur tambahan ... */}
                   </div>
                </div>
                {/* Sidebar Kanan */}
                <div className="space-y-6">
                  <div className="mb-2">
                    <span className="bg-amber-400 text-amber-900 font-bold text-lg px-3 py-1 rounded">Rekomendasi Berita</span>
                  </div>
                  {recommendedNews.length > 0 ? (
                      recommendedNews.map((news) => (
                          <NewsCard
                              key={news.id} // Gunakan ID unik, bukan index
                              id = {news.id}
                              title={news.title}
                              excerpt={news.excerpt}
                              image={news.image}
                              categories={[news.categories?.[0] || ""]}
                              categoryColor={getCategoryColor(news.categories?.[0] || "")}
                          />
                      ))
                  ) : (
                      <p className="text-gray-500">Tidak ada berita yang cocok.</p>
                  )}
                  {/* ... Sisa konten sidebar ... */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
  );
};

export default Index;