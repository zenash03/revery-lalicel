import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8B2420',
        'primary-light': '#A9433F',

        // Secondary Colors
        'secondary': '#A58986',
        'secondary-light': '#C4B2AF',

        // Neutral Colors
        'lavender': '#F9E7E7',
        'isabelle': '#F0E7E6',
        'khaki': '#B0A89B',
        'khaki-dark': '#8A8276',

        // Accent Colors
        'accent-gold': '#D4AF37',
        'accent-green': '#6B8E23',
      },
    },
  },
  plugins: [],
} satisfies Config;
