import React from "react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
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
  );
};

export default SignUpPage;
