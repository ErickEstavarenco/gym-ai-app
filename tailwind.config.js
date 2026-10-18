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
          bg: "#0A0A0B",
          surface: "#151517",
          "surface-elevated": "#1C1C1F",
          line: "#26262B",
          "text-primary": "#FAFAFA",
          "text-secondary": "#A1A1AA",
          "text-muted": "#71717A",
          accent: "#FF4D00",
          "accent-hover": "#FF6B00",
          "accent-muted": "rgba(255, 77, 0, 0.12)",
          success: "#22C55E",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        display: ['"Oswald"', "sans-serif"],
        body: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
        hero: "1.5rem",
        pill: "9999px",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(255, 77, 0, 0.15)",
        glow: "0 0 40px rgba(255, 77, 0, 0.25)",
        "glow-lg": "0 0 60px rgba(255, 77, 0, 0.35)",
        card: "0 8px 32px rgba(0, 0, 0, 0.4)",
        "card-elevated": "0 16px 48px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #FF4D00 0%, #FF6B00 100%)",
        "gradient-dark": "linear-gradient(180deg, #151517 0%, #0A0A0B 100%)",
        "gradient-radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(255, 77, 0, 0.18) 0%, transparent 55%)",
        "gradient-card-fade":
          "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 77, 0, 0.25)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 77, 0, 0.5)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.7" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
