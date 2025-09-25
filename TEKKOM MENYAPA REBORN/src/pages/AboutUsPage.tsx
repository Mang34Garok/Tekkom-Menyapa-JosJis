import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUsPage = () => (
  <div
    className="min-h-screen flex flex-col bg-background relative"
    style={{
      backgroundImage: 'url("/Gambar Latar Belakang.JPG")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <Header />
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">About Us</h1>
        <div className="max-w-2xl text-lg text-white text-center">
          <p className="mb-4">TEKKOM MENYAPA adalah platform komunitas Teknik Komputer ITS yang bertujuan untuk berbagi informasi, inspirasi, dan pengalaman seputar dunia kampus, teknologi, dan masyarakat.</p>
          <p className="mb-4">Kami hadir untuk mendukung mahasiswa, dosen, dan masyarakat umum agar lebih terhubung dan berkembang bersama melalui konten edukatif, event, dan kolaborasi.</p>
          <p className="mb-4">Follow kami di Instagram <a href="https://www.instagram.com/tekkomenyapa/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline">@tekkomenyapa</a> untuk update terbaru!</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
  
export default AboutUsPage;
