module.exports = {
  content: ['./apps/*/src/**/*.{js,ts,jsx,tsx,mdx}', './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '.dark'],
  safelist: [
    // 특수한 클래스들 (패턴으로 매칭하기 어려운것들)
    'w-[85px]',
    'bg-white',
    'text-center',
    'self-start',
    'mx-auto',
    'min-w-0',
    'flex-1',
    'border-transparent',
    'border-b',
    'border-r',
    'table-fixed',
    'border-separate',
    'border-spacing-0',
    'overflow-hidden',
    'overflow-x-auto',
    'overflow-y-auto',
    'min-w-max',
    'max-w-[390px]',
    'min-w-[600px]',
    'max-w-[1200px]',
    'h-[46.5px]',
    'h-15',
    'gap-[3px]',
    'accent-primary-100',
    'sm:px-10',
    'hover:bg-gray-50',
    'md:grid-cols-1',
    'md:grid-rows-6',
    'md:grid-cols-3',
    'md:grid-rows-2',
    // 카테고리 색상들
    'bg-category-rating',
    'bg-category-study',
    'bg-category-general',
    'bg-category-etc',
    'bg-category-external',
    'bg-category-participating',
    'bg-category-recruiting',
    'bg-category-etc_background',
    // 패턴으로 매칭
    { pattern: /^(h|w)-[0-9]+(\.5)?$/ }, // 크기: h-2, w-4, h-1.5 등
    { pattern: /^text-(xs|sm|md|lg|xl|2xl|3xl|4xl)$/ }, // 텍스트 크기
    { pattern: /^font-(normal|medium|semibold|bold)$/ }, // 폰트 굵기
    { pattern: /^(flex|grid|inline-flex)$/ }, // 디스플레이
    { pattern: /^flex-(col|row)$/ }, // flex 방향
    { pattern: /^grid-cols-[1-9]|grid-cols-1[0-2]$/ }, // grid 컬럼: 1-12
    { pattern: /^grid-rows-[1-9]|grid-rows-1[0-2]$/ }, // grid 행: 1-12
    { pattern: /^items-(center|start|end)$/ }, // align-items
    { pattern: /^justify-(center|start|end|between)$/ }, // justify-content
    { pattern: /^(relative|absolute)$/ }, // position
    { pattern: /^(p|px|py|pt|pb|pl|pr)-[0-9]+(\.5)?$/ }, // padding
    { pattern: /^(m|mx|my|mt|mb|ml|mr)-[0-9]+(\.5)?$/ }, // margin
    { pattern: /^gap-[0-9]+(\.5)?$/ }, // gap
    { pattern: /^w-(full|1\/2|24)$/ }, // 특수 너비
    { pattern: /^h-(full|7)$/ }, // 특수 높이
    { pattern: /^rounded(-md|-full)?$/ }, // border-radius
    { pattern: /^border(-primary-300)?$/ }, // border
    { pattern: /^cursor-pointer$/ }, // cursor
    { pattern: /^transition(-colors|-all)?$/ }, // transition
    { pattern: /^bg-gradient-to-(r|l|t|b|tr|tl|br|bl)$/ }, // gradient 방향
    { pattern: /^(from|to)-(primary|gray)-(100|200|300)$/ }, // gradient 색상
    {
      pattern:
        /^text-(gray|primary|green|red|blue|yellow)-(50|100|200|300|400|500|600|700|800|900)$/,
    }, // 텍스트 색상
    {
      pattern: /^bg-(gray|primary|green|red|blue|yellow)-(50|100|200|300|400|500|600|700|800|900)$/,
    }, // 배경색
    {
      pattern:
        /^border-(gray|primary|green|red|blue|yellow)-(50|100|200|300|400|500|600|700|800|900)$/,
    }, // 테두리 색상
  ],
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
          participating: '#01B5C9',
          recruiting: '#F52121',
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
        in: 'fade-in-0 0.15s ease-out',
        out: 'fade-out-0 0.1s ease-in',
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
