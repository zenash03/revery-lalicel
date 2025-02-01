import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "great-vibes": ['var(--font-great-vibes)'],
        "playfair": ['var(--font-playfair-display)'],
        "sans": ['var(--font-raleway)'],
      },
      colors: { 'misty_rose': { DEFAULT: '#fadde1', 100: '#520c15', 200: '#a3182b', 300: '#e1384f', 400: '#ed8a97', 500: '#fadde1', 600: '#fbe3e6', 700: '#fceaec', 800: '#fdf1f2', 900: '#fef8f9' }, 'orchid_pink': { DEFAULT: '#ffc4d6', 100: '#5a001b', 200: '#b40036', 300: '#ff0e56', 400: '#ff6895', 500: '#ffc4d6', 600: '#ffcedd', 700: '#ffdae5', 800: '#ffe7ee', 900: '#fff3f6' }, 'carnation_pink': { DEFAULT: '#ffa6c1', 100: '#550019', 200: '#a90033', 300: '#fe004c', 400: '#ff5487', 500: '#ffa6c1', 600: '#ffbace', 700: '#ffcbdb', 800: '#ffdce7', 900: '#ffeef3' }, 'tickle_me_pink': { DEFAULT: '#ff87ab', 100: '#4e0017', 200: '#9b002f', 300: '#e90046', 400: '#ff3773', 500: '#ff87ab', 600: '#ff9dba', 700: '#ffb6cc', 800: '#ffcedd', 900: '#ffe7ee' }, 'french_rose': { DEFAULT: '#ff5d8f', 100: '#450016', 200: '#8b002c', 300: '#d00042', 400: '#ff1660', 500: '#ff5d8f', 600: '#ff7ca6', 700: '#ff9dbc', 800: '#ffbed2', 900: '#ffdee9' }, 'baker-miller_pink': { DEFAULT: '#ff97b7', 100: '#520018', 200: '#a30031', 300: '#f50049', 400: '#ff477e', 500: '#ff97b7', 600: '#ffadc6', 700: '#ffc2d4', 800: '#ffd6e2', 900: '#ffebf1' }, 'carnation-pink': { DEFAULT: '#ffacc5', 100: '#56001a', 200: '#ab0033', 300: '#ff024e', 400: '#ff588a', 500: '#ffacc5', 600: '#ffbed1', 700: '#ffcedd', 800: '#ffdee8', 900: '#ffeff4' }, 'pink': { DEFAULT: '#ffcad4', 100: '#5c0011', 200: '#b80022', 300: '#ff143f', 400: '#ff708a', 500: '#ffcad4', 600: '#ffd6de', 700: '#ffe0e6', 800: '#ffebee', 900: '#fff5f7' }, 'cherry_blossom_pink': { DEFAULT: '#f4acb7', 100: '#4a0a13', 200: '#941327', 300: '#de1d3a', 400: '#eb6478', 500: '#f4acb7', 600: '#f7bec6', 700: '#f9ced5', 800: '#fbdfe3', 900: '#fdeff1' } }
    },
  },
  plugins: [],
} satisfies Config;
