import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-yekan-bakh)"],
        mono: ["var(--font-yekan-bakh)"],
      },
    },
  },
  daisyui: {
    themes: ["bumblebee"],
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};
export default config;
