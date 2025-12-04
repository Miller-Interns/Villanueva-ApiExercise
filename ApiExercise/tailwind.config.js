/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#667eea',
          hover: '#5568d3'
        },
        secondary: {
          DEFAULT: '#6c757d',
          hover: '#5a6268'
        },
        success: {
          DEFAULT: '#28a745',
          hover: '#218838'
        },
        danger: {
          DEFAULT: '#dc3545',
          hover: '#c82333'
        },
        purple: {
          gradient: '#764ba2'
        }
      }
    }
  },
  plugins: []
};
