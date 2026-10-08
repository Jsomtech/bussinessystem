/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // legacy aliases remapped to the J-Som Tech brand palette
        primary: '#130C2D',
        secondary: '#1D1440',
        accent: '#6027FF',
        jsom: {
          primary: '#6027FF',
          'primary-hover': '#4D1FE0',
          dark: '#130C2D',
          black: '#000000',
          background: '#EEF0F4',
          white: '#FFFFFF',
          muted: '#6B7280',
          border: '#D9DCE3',
        },
      },
    },
  },
  plugins: [],
};
