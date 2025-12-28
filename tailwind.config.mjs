/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00f5a0', // A vibrant, energetic teal
          secondary: '#00b8d4', // A deeper cyan for accents
        },
        dark: {
          900: '#121212', // Near-black for main background
          800: '#1e1e1e', // Slightly lighter for cards/sections
          700: '#2a2a2a', // For borders and dividers
          600: '#3a3a3a', // Hover surfaces
          500: '#4a4a4a', // Active surfaces
        },
        light: {
          100: '#f5f5f5', // Off-white for text
          200: '#e0e0e0', // Lighter text
          300: '#cfcfcf',
          400: '#b0b0b0',
          500: '#8a8a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
    keyframes: {
      meteor: {
        "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
        "70%": { opacity: "1" },
        "100%": {
          transform: "rotate(215deg) translateX(-500px)",
          opacity: "0",
        },
      },
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "meteor-effect": "meteor 5s linear infinite",
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
