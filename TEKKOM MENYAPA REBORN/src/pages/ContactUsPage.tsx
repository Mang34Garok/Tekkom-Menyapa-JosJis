import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactUsPage = () => (
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
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">Contact Us</h1>
        <p className="mb-6 text-lg text-white text-center max-w-xl">Untuk pertanyaan, kritik, atau saran, silakan hubungi kami melalui email <a href="mailto:tekkomenyapa@gmail.com" className="text-yellow-300 underline">tekkomenyapa@gmail.com</a> atau DM Instagram <a href="https://www.instagram.com/tekkomenyapa/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline">@tekkomenyapa</a>.</p>
        <form className="w-full max-w-md space-y-4">
          <input type="text" placeholder="Nama" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring bg-black/60 text-white placeholder:text-gray-300" required />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring bg-black/60 text-white placeholder:text-gray-300" required />
          <textarea placeholder="Pesan" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring bg-black/60 text-white placeholder:text-gray-300" rows={4} required />
          <button type="submit" className="w-full py-2 bg-yellow-400 text-black rounded font-bold hover:bg-yellow-300 transition">Kirim</button>
        </form>
      </div>
    </div>
    <Footer />
  </div>
  );

export default ContactUsPage;
