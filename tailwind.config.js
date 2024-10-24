import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007AFF',
        },
        red: {
          DEFAULT: '#EB4036',
        }
      },
      borderRadius: {
        lg: '0.4rem',
        xl: '0.8rem'
      }
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        html: { fontSize: '10px' },
      })
    })
  ],
}

