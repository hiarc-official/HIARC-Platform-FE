/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/*/src/**/*.{js,ts,jsx,tsx,mdx}', './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '.dark'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00AAFF',
          100: '#01B5C9',
          200: '#276A91',
          300: '#000947',
        },
        gray: {
          50: '#f7f8f9',
          100: '#F0F0F6',
          200: '#DEDEEB',
          300: '#D0D0DD',
          400: '#d0d0d0',
          500: '#97979D',
          600: '#767676',
          700: '#58585F',
          800: '#424242',
          900: '#0F0F11',
        },
        red: '#F52121',
        purple: '#DB3BFF',
        orange: '#FFAE2C',
        white: '#FFFFFF',
        black: '#111111',
        warning: '#ff2020',
        category: {
          rating: '#00AAFF',
          study: '#FFAE2C',
          etc: '#ADAD00',
          etc_background: '#E7E700',
          general: '#44D215',
          external: '#332AE8',
        },
      },
      // Typography from typography.css
      fontSize: {
        sm: ['0.75rem', { lineHeight: '1.5' }],
        md: ['0.875rem', { lineHeight: '1.5' }],
        lg: ['1rem', { lineHeight: '1.5' }],
        xl: ['1.125rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.5' }],
        '3xl': ['1.75rem', { lineHeight: '1.5' }],
        '4xl': ['2rem', { lineHeight: '1.5' }],
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      // Border radius from shape.css and globals.css
      borderRadius: {
        none: '0',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.75rem',
        full: '100px',
      },
      // Box shadow from shadow.css
      boxShadow: {
        'default-shadow': '0 12px 24px -12px rgba(41, 46, 56, 0.12)',
      },
      // Animations from animation.css
      keyframes: {
        fadeIn: {
          to: { opacity: '1' },
        },
        fadeOut: {
          to: { opacity: '0' },
        },
        'fade-in-0': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out-0': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'zoom-in-95': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'zoom-out-95': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.95)' },
        },
        'slide-in-from-top-2': {
          from: { transform: 'translateY(-0.5rem)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom-2': {
          from: { transform: 'translateY(0.5rem)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left-2': {
          from: { transform: 'translateX(-0.5rem)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right-2': {
          from: { transform: 'translateX(0.5rem)' },
          to: { transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 2px rgba(255, 0, 0, 0.7)' },
          '100%': { boxShadow: '0 0 4px rgba(255, 0, 0, 1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-out': 'fadeOut 0.2s ease-in forwards',
        'in': 'fade-in-0 0.15s ease-out',
        'out': 'fade-out-0 0.1s ease-in',
        'fade-in-0': 'fade-in-0 0.15s ease-out',
        'fade-out-0': 'fade-out-0 0.1s ease-in',
        'zoom-in-95': 'zoom-in-95 0.15s ease-out',
        'zoom-out-95': 'zoom-out-95 0.1s ease-in',
        'slide-in-from-top-2': 'slide-in-from-top-2 0.15s ease-out',
        'slide-in-from-bottom-2': 'slide-in-from-bottom-2 0.15s ease-out',
        'slide-in-from-left-2': 'slide-in-from-left-2 0.15s ease-out',
        'slide-in-from-right-2': 'slide-in-from-right-2 0.15s ease-out',
        glow: 'glow 1.5s infinite alternate',
        'marquee-forward': 'marquee 10s linear infinite',
        'marquee-reverse': 'marquee 12s linear infinite reverse',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.fade-in': {
          opacity: '0',
          animation: 'fadeIn 0.3s ease-out forwards',
        },
        '.fade-out': {
          opacity: '1',
          animation: 'fadeOut 0.2s ease-in forwards',
        },
        '.animate-in': {
          animation: 'fade-in-0 0.15s ease-out',
        },
        '.animate-out': {
          animation: 'fade-out-0 0.1s ease-in',
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
    function ({ addBase }) {
      addBase({
        '*': {
          'border-color': 'rgb(237 237 237)',
        },
        body: {
          'background-color': 'rgb(255 255 255)',
          color: 'rgb(15 23 42)',
        },
        '.dark': {
          'border-color': 'rgb(39 39 42)',
        },
        '.dark body': {
          'background-color': 'rgb(15 23 42)',
          color: 'rgb(248 250 252)',
        },
      });
    },
  ],
};
