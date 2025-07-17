/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/*/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '.dark'],
  theme: {
    extend: {
      colors: {
        // Shadcn/ui colors using RGB with opacity support
        border: "rgb(237 237 237)",
        input: "rgb(237 237 237)",
        ring: "rgb(148 163 184)",
        background: "rgb(255 255 255)",
        foreground: "rgb(15 23 42)",
        primary: {
          DEFAULT: "rgb(51 65 85)",
          foreground: "rgb(248 250 252)",
        },
        secondary: {
          DEFAULT: "rgb(241 245 249)",
          foreground: "rgb(51 65 85)",
        },
        destructive: {
          DEFAULT: "rgb(239 68 68)",
          foreground: "rgb(248 250 252)",
        },
        muted: {
          DEFAULT: "rgb(241 245 249)",
          foreground: "rgb(100 116 139)",
        },
        accent: {
          DEFAULT: "rgb(241 245 249)",
          foreground: "rgb(51 65 85)",
        },
        popover: {
          DEFAULT: "rgb(255 255 255)",
          foreground: "rgb(15 23 42)",
        },
        card: {
          DEFAULT: "rgb(255 255 255)",
          foreground: "rgb(15 23 42)",
        },
        // Dark mode variants
        "dark-border": "rgb(39 39 42)",
        "dark-input": "rgb(39 39 42)",
        "dark-ring": "rgb(82 82 91)",
        "dark-background": "rgb(15 23 42)",
        "dark-foreground": "rgb(248 250 252)",
        "dark-primary": {
          DEFAULT: "rgb(237 237 237)",
          foreground: "rgb(51 65 85)",
        },
        "dark-secondary": {
          DEFAULT: "rgb(39 39 42)",
          foreground: "rgb(248 250 252)",
        },
        "dark-destructive": {
          DEFAULT: "rgb(220 38 38)",
          foreground: "rgb(248 250 252)",
        },
        "dark-muted": {
          DEFAULT: "rgb(39 39 42)",
          foreground: "rgb(163 163 163)",
        },
        "dark-accent": {
          DEFAULT: "rgb(39 39 42)",
          foreground: "rgb(248 250 252)",
        },
        "dark-popover": {
          DEFAULT: "rgb(39 39 42)",
          foreground: "rgb(248 250 252)",
        },
        "dark-card": {
          DEFAULT: "rgb(39 39 42)",
          foreground: "rgb(248 250 252)",
        },
        // Chart colors
        chart: {
          1: "oklch(0.646 0.222 41.116)",
          2: "oklch(0.6 0.118 184.704)",
          3: "oklch(0.398 0.07 227.392)",
          4: "oklch(0.828 0.189 84.429)",
          5: "oklch(0.769 0.188 70.08)",
        },
        // Sidebar colors
        sidebar: {
          DEFAULT: "oklch(0.985 0.002 247.839)",
          foreground: "oklch(0.13 0.028 261.692)",
          primary: "oklch(0.21 0.034 264.665)",
          'primary-foreground': "oklch(0.985 0.002 247.839)",
          accent: "oklch(0.967 0.003 264.542)",
          'accent-foreground': "oklch(0.21 0.034 264.665)",
          border: "oklch(0.928 0.006 264.531)",
          ring: "oklch(0.707 0.022 261.325)",
        },
        // Custom colors from colors.css
        gray: {
          50: "#f7f8f9",
          100: "#f6f6f6",
          200: "#eeeeee",
          300: "#e3e3e3",
          400: "#d0d0d0",
          500: "#aaaaaa",
          600: "#767676",
          700: "#666666",
          800: "#424242",
          900: "#222222",
        },
        main: {
          100: "#fffbfa",
          200: "#fff6f2",
          300: "#ffebe3",
          400: "#ffdac7",
          500: "#ffc3ad",
          600: "#ffae90",
          700: "#ff6b4a",
          800: "#ff5900",
          900: "#ff3c00",
        },
        white: "#ffffff",
        black: "#111111",
        warning: "#ff2020",
        'gray-shadow-70': "#000000b3",
        green: {
          400: "#b8d530",
          500: "#8dc71e",
          600: "#69b41e",
          700: "#187c19",
          800: "#0d5b11",
        },
        blue: {
          200: "#deecfb",
          300: "#bedaf7",
          400: "#7ab3ef",
          500: "#368ce7",
          600: "#1666ba",
        },
        red: {
          300: "#ffbaba",
          400: "#ff7b7b",
          500: "#ff5252",
          600: "#ff0000",
          700: "#a70000",
        },
        mint: {
          100: "#e5fff4",
          200: "#c8f4e1",
          300: "#b6f6da",
          400: "#aaf0d1",
          500: "#96e6c2",
          600: "#7dd8b5",
          700: "#5ec69d",
          800: "#3eb489",
          900: "#1d9c6d",
        },
      },
      // Typography from typography.css
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1" }],
        sm: ["0.8125rem", { lineHeight: "1" }],
        base: ["0.875rem", { lineHeight: "1" }],
        lg: ["1rem", { lineHeight: "calc(24 / 16)" }],
        xl: ["1.125rem", { lineHeight: "calc(27 / 18)" }],
        "2xl": ["1.25rem", { lineHeight: "1" }],
        "3xl": ["1.5rem", { lineHeight: "1" }],
        "4xl": ["1.75rem", { lineHeight: "1" }],
        "5xl": ["2rem", { lineHeight: "1" }],
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        suite: ["SUITE", "sans-serif"],
      },
      // Border radius from shape.css and globals.css
      borderRadius: {
        lg: "0.625rem",
        md: "calc(0.625rem - 2px)",
        sm: "calc(0.625rem - 4px)",
        xl: "calc(0.625rem + 4px)",
        // Custom radius from shape.css
        "odos-0": "0rem",
        "odos-0.5": "0.125rem",
        "odos-1": "0.25rem",
        "odos-1.5": "0.375rem",
        "odos-2": "0.5rem",
        "odos-3": "0.75rem",
        "odos-4": "1rem",
      },
      // Box shadow from shadow.css
      boxShadow: {
        "odos-default": "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
      },
      // Animations from animation.css
      keyframes: {
        fadeIn: {
          to: { opacity: "1" },
        },
        fadeOut: {
          to: { opacity: "0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 2px rgba(255, 0, 0, 0.7)" },
          "100%": { boxShadow: "0 0 4px rgba(255, 0, 0, 1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "fade-out": "fadeOut 0.2s ease-in forwards",
        glow: "glow 1.5s infinite alternate",
        "marquee-forward": "marquee 10s linear infinite",
        "marquee-reverse": "marquee 12s linear infinite reverse",
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.fade-in': {
          opacity: '0',
          animation: 'fadeIn 0.3s ease-out forwards',
        },
        '.fade-out': {
          opacity: '1',
          animation: 'fadeOut 0.2s ease-in forwards',
        },
        '.animate-glow': {
          animation: 'glow 1.5s infinite alternate',
        },
        '.marquee': {
          display: 'flex',
          width: '200%',
          'animation-timing-function': 'linear',
          'animation-iteration-count': 'infinite',
        },
        '.marquee--forward': {
          'animation-name': 'marquee',
          'animation-duration': '10s',
          'animation-direction': 'normal',
        },
        '.marquee--reverse': {
          'animation-name': 'marquee',
          'animation-duration': '12s',
          'animation-direction': 'reverse',
        },
      };
      addUtilities(newUtilities);
    },
    function({ addBase }) {
      addBase({
        '*': {
          'border-color': 'rgb(237 237 237)',
        },
        'body': {
          'background-color': 'rgb(255 255 255)',
          'color': 'rgb(15 23 42)',
        },
        '.dark': {
          'border-color': 'rgb(39 39 42)',
        },
        '.dark body': {
          'background-color': 'rgb(15 23 42)',
          'color': 'rgb(248 250 252)',
        },
      });
    },
  ],
}