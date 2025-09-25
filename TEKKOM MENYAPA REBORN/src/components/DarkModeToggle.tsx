import React, { useEffect, useState } from "react";

// Simple dark mode toggle with localStorage persistence
const DarkModeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="fixed bottom-8 left-8 z-50 p-3 rounded-full shadow-lg bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 border-2 border-yellow-500 dark:border-yellow-700 transition hover:scale-110 hover:shadow-2xl focus:outline-none"
      onClick={() => setDark((d) => !d)}
      style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)" }}
    >
      {dark ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" /></svg>
      )}
    </button>
  );
};

export default DarkModeToggle;
