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
        loginBg: "url(../../public/images/loginBg.png)",
      },
      colors: {
        primary: "#972286",
        HCMgrey: "#737373",
        HCMblack: "#2D2F31",
      },
    },
  },
  plugins: [],
};
export default config;
