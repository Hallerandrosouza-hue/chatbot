/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "#E5E7EB",
        input: "#F9FAFB",
        background: "#F9FAFB",
        foreground: "#111827",
        primary: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        sidebar: {
          background: "#FFFFFF",
          foreground: "#4B5563",
          active: "#3B82F6",
          hover: "#F3F4F6",
          border: "#E5E7EB"
        }
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
      }
    },
  },
  plugins: [],
}
