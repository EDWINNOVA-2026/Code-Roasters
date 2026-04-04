/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",   // ✅ important for Next.js App Router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        emergency: "#ef4444",
        "emergency-foreground": "#ffffff",

        primary: "#f59e0b",
        info: "#3b82f6",
        success: "#22c55e",

        // Optional but recommended
        background: "#020617",
        foreground: "#ffffff",
        muted: "#1e293b",
      },
    },
  },

  plugins: [],
};