import React from "react";

const Kontak = () => (
  <div className="container mx-auto px-4 py-10 max-w-2xl">
    <h1 className="text-3xl font-bold mb-4 text-yellow-500">Kontak Kami</h1>
    <p className="mb-4">Jika Anda memiliki pertanyaan, kritik, atau saran, silakan hubungi kami melalui form di bawah atau email ke <a href="mailto:info@nowwownews.com" className="text-blue-600 underline">info@nowwownews.com</a>.</p>
    <form className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
      <input type="text" placeholder="Nama" className="border rounded px-3 py-2" required />
      <input type="email" placeholder="Email" className="border rounded px-3 py-2" required />
      <textarea placeholder="Pesan" className="border rounded px-3 py-2" rows={4} required />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors font-semibold">Kirim Pesan</button>
    </form>
  </div>
);

export default Kontak;
