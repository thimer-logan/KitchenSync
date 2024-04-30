import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // primary: "#4CAF50", // Green
        // secondary: "#FFEB3B", // Yellow
        // background: "#FFFFFF", // White
        // accent: "#2196F3", // Blue
        // text: "#333333", // Dark Gray

        primary: "#607D8B", // Blue Gray
        secondary: "#FFC107", // Amber
        background: "#FAFAFA", // Off White
        accent: "#E91E63", // Pink
        text: "#424242", // Darker Gray

        // primary: '#009688', // Teal
        // secondary: '#00BCD4', // Cyan
        // background: '#E0F7FA', // Pale Cyan
        // accent: '#006064', // Dark Cyan
        // text: '#263238', // Blue Gray
      },
    },
  },
  plugins: [],
};
export default config;
