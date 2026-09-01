import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#9FB3C8",
          400: "#627D98",
          500: "#334E68",
          600: "#243B53",
          700: "#1A2E44",
          800: "#102236",
          900: "#0A192F",
          950: "#050C17",
        },
        gold: {
          50: "#FDFBF4",
          100: "#FAF3DB",
          200: "#F4E4AF",
          300: "#ECD17F",
          400: "#E2BA48",
          500: "#C99B23",
          600: "#A87C14",
          700: "#835C0C",
          800: "#624207",
          900: "#442C03",
        },
        cream: {
          50: "#FDFAF6",
          100: "#F8F3EA",
          200: "#EFE5D3",
          300: "#E3D3B8",
          400: "#CDB692",
          500: "#B0966F",
        },
        crimson: {
          50: "#FDF2F3",
          500: "#8E1B29",
          600: "#75121E",
          700: "#5B0B15",
          800: "#44060E",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-serif)", "Georgia", "serif"],
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
