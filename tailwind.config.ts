import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nova: {
          gold: "#D4AF37",
          goldLight: "#EED789",
          goldDark: "#A8841B",
          black: "#101010",
          cardDark: "#181818",
          cardDarkHover: "#222222",
          borderDark: "#2A2A2A",
          ivory: "#F8F5EF",
          ivoryLight: "#FFFDF9",
          ivoryBorder: "#E8E2D5",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(212, 175, 55, 0.25)",
        goldGlow: "0 0 25px rgba(212, 175, 55, 0.35)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F5E08C 50%, #B88E1C 100%)",
        "dark-gradient": "linear-gradient(180deg, #161616 0%, #101010 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
