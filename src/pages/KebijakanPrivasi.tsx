import React from "react";
import Layout from "../components/Layout";

const KebijakanPrivasi = () => (
  <Layout>
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="bg-white p-6 rounded-lg shadow text-black">
        <h1 className="text-3xl font-bold mb-4 text-yellow-500">Kebijakan Privasi</h1>
        <p className="mb-4">Kami menghargai privasi Anda. Semua data yang dikumpulkan hanya digunakan untuk meningkatkan layanan dan tidak akan dibagikan ke pihak ketiga tanpa persetujuan Anda.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Data pengguna hanya digunakan untuk keperluan internal.</li>
          <li>Kami menggunakan cookie untuk meningkatkan pengalaman pengguna.</li>
          <li>Anda dapat menghubungi kami untuk permintaan penghapusan data.</li>
        </ul>
        <p>Jika ada pertanyaan terkait privasi, silakan hubungi kami melalui halaman kontak.</p>
      </div>
    </div>
  </Layout>
);

export default KebijakanPrivasi;
