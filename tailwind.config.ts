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
        background: "#F6F3ED",
        foreground: "#1C2730",
        
        // Exact Specification Colors
        midnight: {
          DEFAULT: "#0B1F33",
          900: "#0B1F33",
          950: "#061320",
        },
        oxford: {
          DEFAULT: "#163A5F",
          600: "#163A5F",
          700: "#112E4C",
          800: "#0B1F33",
        },
        deepteal: {
          DEFAULT: "#2F5D62",
          500: "#2F5D62",
          600: "#24494D",
          700: "#1A3538",
        },
        sage: {
          DEFAULT: "#A8C3BC",
          50: "#F5F8F7",
          100: "#E9F0EE",
          200: "#D3E3DF",
          300: "#BCD5CE",
          400: "#A8C3BC",
          500: "#8FAFA7",
          600: "#74938C",
        },
        ivory: {
          DEFAULT: "#F6F3ED",
          50: "#FDFAF6",
          100: "#FAF7F2",
          200: "#F6F3ED",
          300: "#EBE6DC",
          400: "#DDD5C8",
        },
        cloudwhite: "#FFFFFF",
        darkslate: "#1C2730",
        mutedslate: "#68747C",

        // Compatibility Mappings
        primary: "#0B1F33",
        secondary: "#163A5F",
        accent: "#2F5D62",
        navy: {
          50: "#F0F4F8",
          100: "#D6E2EC",
          200: "#B0C5D8",
          300: "#8AA8C4",
          400: "#507D9F",
          500: "#2B5678",
          600: "#163A5F",
          700: "#163A5F",
          800: "#0B1F33",
          900: "#0B1F33",
          950: "#061320",
        },
        teal: {
          50: "#F2F7F6",
          100: "#DFECEB",
          200: "#C0D9D7",
          300: "#9EC4C1",
          400: "#75A4A1",
          500: "#2F5D62",
          600: "#2F5D62",
          700: "#24494D",
          800: "#1A3538",
        },
      },
      fontFamily: {
        editorial: ["var(--font-editorial)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
        mono: ["var(--font-mono-tag)", "DM Mono", "monospace"],
        prestige: ["var(--font-serif-prestige)", "Playfair Display", "Georgia", "serif"],
        serif: ["var(--font-editorial)", "Cormorant Garamond", "Georgia", "serif"],
        heading: ["var(--font-editorial)", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-editorial)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
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
