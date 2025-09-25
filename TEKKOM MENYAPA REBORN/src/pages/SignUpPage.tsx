import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SignUpPage = () => {
  return (
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
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg relative z-10">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" required />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" required />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" required />
            <button type="submit" className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Sign Up</button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account?</span>
            <a href="/login" className="ml-2 text-primary font-medium hover:underline">Login</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
