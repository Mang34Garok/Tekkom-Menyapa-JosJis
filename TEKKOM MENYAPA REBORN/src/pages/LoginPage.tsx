import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" required />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" required />
          <button type="submit" className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Login</button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account?</span>
          <a href="/signup" className="ml-2 text-primary font-medium hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
