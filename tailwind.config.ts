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
        background: "#F7F1DE",
        foreground: "#4E220F",
        
        // Custom 4-Color Palette System
        espresso: {
          DEFAULT: "#4E220F",
          900: "#4E220F",
          950: "#361609",
        },
        copper: {
          DEFAULT: "#9D6638",
          500: "#9D6638",
          600: "#82522B",
          700: "#673E1E",
        },
        sage: {
          DEFAULT: "#B0BA99",
          50: "#F6F8F3",
          100: "#E9EDDF",
          200: "#D7DFC6",
          300: "#C4CEAC",
          400: "#B0BA99",
          500: "#98A381",
          600: "#7C8866",
        },
        cream: {
          DEFAULT: "#F7F1DE",
          50: "#FFFDF7",
          100: "#FAF5E8",
          200: "#F7F1DE",
          300: "#EBE3C8",
          400: "#DCD0AE",
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
        crimson: {
          50: "#FDF2F3",
          500: "#8E1B29",
          600: "#75121E",
          700: "#5B0B15",
          800: "#44060E",
        },
        // Mappings for compatibility with existing classes
        midnight: {
          DEFAULT: "#4E220F",
          900: "#4E220F",
          950: "#361609",
        },
        oxford: {
          DEFAULT: "#612B13",
          600: "#612B13",
          700: "#4E220F",
          800: "#361609",
        },
        deepteal: {
          DEFAULT: "#9D6638",
          500: "#9D6638",
          600: "#82522B",
          700: "#673E1E",
        },
        ivory: {
          DEFAULT: "#F7F1DE",
          50: "#FFFDF7",
          100: "#FAF5E8",
          200: "#F7F1DE",
          300: "#EBE3C8",
          400: "#DCD0AE",
        },
        cloudwhite: "#FFFFFF",
        darkslate: "#4E220F",
        mutedslate: "#7E5F4E",

        // Compatibility Mappings
        primary: "#4E220F",
        secondary: "#9D6638",
        accent: "#B0BA99",
        navy: {
          50: "#FFFDF7",
          100: "#FAF5E8",
          200: "#D7DFC6",
          300: "#B0BA99",
          400: "#9D6638",
          500: "#82522B",
          600: "#612B13",
          700: "#4E220F",
          800: "#4E220F",
          900: "#361609",
          950: "#240E05",
        },
        teal: {
          50: "#F6F8F3",
          100: "#E9EDDF",
          200: "#D7DFC6",
          300: "#B0BA99",
          400: "#9D6638",
          500: "#9D6638",
          600: "#82522B",
          700: "#673E1E",
          800: "#4E220F",
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
