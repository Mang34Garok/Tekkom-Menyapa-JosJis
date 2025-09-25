import Header from "@/components/Header";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import CategoryFilter from "@/components/CategoryFilter";
import { useState, useRef, useEffect } from "react";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";

// Import images
import carSafetyHero from "@/assets/car-safety-hero.jpg";
import musicProductionHero from "@/assets/music-production-hero.jpg";
import monitorSetupHero from "@/assets/monitor-setup-hero.jpg";
import boatingSeattle from "@/assets/boating-seattle.jpg";
import laptopProgramming from "@/assets/laptop-programming.jpg";
import selfDrivingCar from "@/assets/self-driving-car (2).jpg";
import fastFoodGuide from "@/assets/fast-food-guide.jpg";

const Index = () => {
  const featuredArticles = [
    {
      title: "Profil Departemen Teknik Komputer ITS",
      description: "Teknik Komputer memberikan pemahaman yang kuat pada teori dan prinsip komputasi, matematika, ilmu pengetahuan dan teknik untuk memecahkan permasalahan teknis melalui desain perangkat keras komputer, perangkat lunak",
      image: carSafetyHero,
      author: {
        name: "James",
        date: "August 18, 2022",
      },
    },
    {
      title: "Kegiatan Sertifikasi Kompetensi Kerja (SKK) Alumni dan Calon Wisudawan Tahun 2025",
      description: "Pelaksanaan uji sertifikasi ini dilakukan di dua lokasi, yaitu Ruang Auditorium Vokasi 103 dan Ruang 10, dengan pendampingan langsung dari para asesor bersertifikat. Para peserta diuji sesuai bidang keahliannya masing-masing, baik dalam bentuk wawancara, portofolio, maupun praktik teknis.",
      image: musicProductionHero,
      author: {
        name: "Louie Hoebregts",
        date: "July 23, 2022",
      },
    },
    {
      title: "Wisuda ke-132 ITS untuk periode September 2025 akan diselenggarakan",
      description: "Jumat, 12 September 2025, pukul 13.30 WIB di Gedung Graha ITS, dan akan dilaksanakan secara luring",
      image: monitorSetupHero,
      author: {
        name: "Mary",
        date: "July 14, 2022",
      },
    },
  ];

  const popularPosts = [
    {
      title: "BMKG Prakirakan Cuaca Surabaya, Sidoarjo, dan Gresik 25 September 2025: Tak Ada Hujan",
      description: "“Cuaca di Surabaya dan Sidoarjo diprediksi tidak akan turun hujan. Begitu juga untuk wilayah Gresik yang cenderung cerah pagi hari ini. Suhu antara 26°C hingga 35°C,” ujar Prakiraan BMKG Juanda, Oky Sukma Hakim, Rabu (24/9/2025).",
      image: boatingSeattle,
      author: {
        name: "James",
        date: "August 18, 2022",
      },
    },
    {
      title: "Video: AI Dipakai Untuk Menjadi Pasangan Hidup, Memang Bisa?",
      description: "Perkembangan kecerdasan buatan (AI) kini telah masuk ke ranah personal, salah satunya melalui hadirnya pasangan virtual.",
      image: laptopProgramming,
      author: {
        name: "Louie Hoebregts",
        date: "July 23, 2022",
      },
    },
    {
      title: "12 Rekomendasi Tempat Makan Enak di Dekat Pelabuhan Tanjung Perak Surabaya 2025, Wajib Dicoba",
      description: "Berkunjung ke pelabuhan terbesar di Surabaya tak lengkap tanpa mencoba sajian kuliner khas yang ada di sekitarnya",
      image: selfDrivingCar,
      author: {
        name: "Mary",
        date: "July 14, 2022",
      },
    },
    {
      title: "Begal Surabaya",
      description: "Polrestabes Surabaya membekuk kelompok begal sadis yang membacok korban yang bernama Yudhi di Jalan Ngagel, Sabtu (31/08/2024) kemarin.",
      image: fastFoodGuide,
      author: {
        name: "Jon Kantner",
        date: "May 16, 2022",
      },
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const morePosts = [
    {
      title: "ITS Luncurkan Mobil Listrik Baru 2025",
      description: "Departemen Teknik Komputer ITS memperkenalkan prototipe mobil listrik terbaru hasil karya mahasiswa.",
      image: carSafetyHero,
      author: { name: "Dewi", date: "September 20, 2025" },
      kategori: "Teknologi",
    },
    {
      title: "Mahasiswa ITS Raih Juara Hackathon Nasional",
      description: "Tim mahasiswa ITS berhasil meraih juara 1 dalam kompetisi hackathon tingkat nasional di Jakarta.",
      image: musicProductionHero,
      author: { name: "Rizky", date: "September 18, 2025" },
      kategori: "Prestasi",
    },
    {
      title: "Pelatihan IoT untuk Guru SMK se-Jawa Timur",
      description: "ITS mengadakan pelatihan Internet of Things (IoT) untuk guru-guru SMK di Jawa Timur.",
      image: monitorSetupHero,
      author: { name: "Sari", date: "September 15, 2025" },
      kategori: "Pelatihan",
    },
    {
      title: "Pengabdian Masyarakat: Smart Farming di Lamongan",
      description: "Mahasiswa Teknik Komputer ITS membantu petani Lamongan dengan teknologi smart farming.",
      image: boatingSeattle,
      author: { name: "Budi", date: "September 10, 2025" },
      kategori: "Pengabdian",
    },
    {
      title: "Webinar Nasional: AI dan Masa Depan Teknologi",
      description: "Webinar nasional membahas perkembangan Artificial Intelligence dan dampaknya di Indonesia.",
      image: laptopProgramming,
      author: { name: "Nina", date: "September 8, 2025" },
      kategori: "Webinar",
    },
    {
      title: "ITS Buka Pendaftaran Beasiswa Prestasi 2025",
      description: "Beasiswa prestasi untuk mahasiswa aktif kembali dibuka dengan kuota terbatas.",
      image: selfDrivingCar,
      author: { name: "Andi", date: "September 5, 2025" },
      kategori: "Beasiswa",
    },
    {
      title: "Lomba Poster Digital Nasional 2025",
      description: "Mahasiswa ITS diundang untuk mengikuti lomba poster digital tingkat nasional.",
      image: fastFoodGuide,
      author: { name: "Putri", date: "September 2, 2025" },
      kategori: "Kompetisi",
    },
    {
      title: "Workshop Cloud Computing untuk Mahasiswa Baru",
      description: "Workshop pengenalan cloud computing diadakan khusus untuk mahasiswa baru Teknik Komputer.",
      image: musicProductionHero,
      author: { name: "Fajar", date: "September 1, 2025" },
      kategori: "Pelatihan",
    },
  ];

  // Filter berita sesuai kategori
  const [fade, setFade] = useState(true);
  const prevCategory = useRef(selectedCategory);
  useEffect(() => {
    if (prevCategory.current !== selectedCategory) {
      setFade(false);
      const timeout = setTimeout(() => setFade(true), 200);
      prevCategory.current = selectedCategory;
      return () => clearTimeout(timeout);
    }
  }, [selectedCategory]);

  const filteredMorePosts = selectedCategory === "Semua"
    ? morePosts
    : morePosts.filter((post) => post.kategori === selectedCategory);

  return (
    <div
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: 'url("/Gambar Latar Belakang.JPG")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/30 z-0" />
      <div className="relative z-10">
        <Header />
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
  {/* ScrollToTopButton hanya tampil jika tidak hover di #Maba */}
  {selectedCategory !== "Maba" && <ScrollToTopButton />}
        {/* Featured Articles */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredArticles.map((article, index) => (
              <ArticleCard
                key={index}
                      title={article.title}
                      description={article.description}
                      image={article.image}
                      author={article.author}
                      size="large"
                    />
                  ))}
                </div>
                {/* Popular Posts Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      <h2 className="text-xl font-bold text-yellow-400">Popular Posts</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {popularPosts.map((post, index) => (
                      <ArticleCard
                        key={index}
                        title={post.title}
                        description={post.description}
                        image={post.image}
                        author={post.author}
                        size="small"
                      />
                    ))}
                  </div>
                  {/* More News Section */}
                  <div className="mt-10">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      <h2 className="text-xl font-bold text-yellow-400">Berita Lainnya</h2>
                    </div>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                      {filteredMorePosts.map((post, index) => (
                        <ArticleCard
                          key={index}
                          title={post.title}
                          description={post.description}
                          image={post.image}
                          author={post.author}
                          size="small"
                          kategori={post.kategori}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <Footer />
            {/* ScrollToTopButton hanya tampil jika tidak hover di #Maba */}
            {selectedCategory !== "Maba" && <ScrollToTopButton />}
            <DarkModeToggle />
          </div>
  );
}

export default Index;