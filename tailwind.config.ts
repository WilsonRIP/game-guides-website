// tailwind.config.ts
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: { /* ... your existing colors ... */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: { /* ... your existing borderRadius ... */
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: { /* ... your existing fontFamily ... */
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "caret-blink": { // Existing
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "shake": { // Existing
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        "pulse-once": { // Existing
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        // New Animations
        "char-pop": {
          "0%": { transform: "scale(0.8)", opacity: "0.5" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "char-wiggle": {
          "0%, 100%": { transform: "rotate(0deg) scale(1.1)" },
          "25%": { transform: "rotate(-8deg) scale(1.1)" },
          "75%": { transform: "rotate(8deg) scale(1.1)" },
        },
        "word-correct-flash": {
          "0%, 100%": { backgroundColor: "transparent" },
          "50%": { backgroundColor: "hsla(var(--primary), 0.2)" },
        },
        "input-focus-glow": {
            "0%": { boxShadow: "0 0 0 0 hsla(var(--ring), 0.5)" },
            "100%": { boxShadow: "0 0 0 4px hsla(var(--ring), 0)" },
        }
      },
      animation: {
        "caret-blink": "caret-blink 1.2s infinite", // Existing
        "shake": "shake 0.3s ease-in-out", // Existing
        "pulse-once": "pulse-once 0.5s ease-out", // Existing
        // New Animations
        "char-pop": "char-pop 0.2s ease-out forwards",
        "char-wiggle": "char-wiggle 0.3s ease-in-out",
        "word-correct-flash": "word-correct-flash 0.4s ease-out",
        "input-focus-glow": "input-focus-glow 0.7s forwards ease-out",
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;