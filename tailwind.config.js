// tailwind.config.js
module.exports = {
  darkMode: 'class', // veya 'media'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7F00FF',
          DEFAULT: '#5A00FF',
          dark: '#4B00DB',
        },
        secondary: {
          light: '#FF7F50',
          DEFAULT: '#FF4500',
          dark: '#FF2400',
        },
      },
    },
  },
  plugins: [],
};