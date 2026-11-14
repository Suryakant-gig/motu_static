/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFF5F7',
          softPink: '#F8C8D8',
          rose: '#EFA2BB',
          deepRose: '#D9658B',
          lavender: '#E8E0FF',
          cream: '#FFF9EF',
          dark: '#49343D',
          muted: '#7A626C',
          card: 'rgba(255, 255, 255, 0.75)',
        }
      },
      fontFamily: {
        rounded: ['Fredoka', 'Nunito', 'sans-serif'],
        script: ['Pacifico', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'kawaii': '0 10px 25px -5px rgba(239, 162, 187, 0.3), 0 8px 10px -6px rgba(239, 162, 187, 0.2)',
        'kawaii-lg': '0 20px 35px -5px rgba(239, 162, 187, 0.4), 0 10px 15px -5px rgba(232, 224, 255, 0.4)',
        'kawaii-glow': '0 0 20px rgba(239, 162, 187, 0.6)',
        'glass': '0 8px 32px 0 rgba(239, 162, 187, 0.15)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

