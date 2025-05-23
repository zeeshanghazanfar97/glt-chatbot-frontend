/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#FFF0F6',
          100: '#FFE0EB',
          200: '#FFC2D7',
          300: '#FFA3C2',
          400: '#FC7DAF',  // Updated to match requested color
          500: '#FC7DAF',  // Primary pink color updated
          600: '#E56A9C',
          700: '#CC5789',
          800: '#B24476',
          900: '#993163',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        messageAppear: 'messageAppear 0.3s ease-out forwards',
        typing: 'typing 0.8s infinite',
        slideInRight: 'slideInRight 0.3s ease-out',
        slideInLeft: 'slideInLeft 0.3s ease-out',
        slideOutRight: 'slideOutRight 0.3s ease-in',
        slideOutLeft: 'slideOutLeft 0.3s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        messageAppear: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        typing: {
          '0%': { opacity: 0.3 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.3 },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-100%)', opacity: 0 },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#FC7DAF',
              textDecoration: 'underline',
              '&:hover': {
                color: '#E56A9C',
              },
            },
            p: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ul, ol': {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            code: {
              color: '#FC7DAF',
              backgroundColor: '#FFF0F6',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/typography'),
  ],
}