tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gym: {
          dark: "#0D0D0D",
          card: "#1A1A1A",
          orange: "#FF4D00", // Laranja/Coral do wireframe
          accent: "#FF6B00",
          text: "#FFFFFF",
          muted: "#A0A0A0",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}