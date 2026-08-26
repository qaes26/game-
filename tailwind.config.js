/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        game: {
          blue: '#38bdf8',
          'blue-dark': '#0284c7',
          pink: '#f472b6',
          'pink-dark': '#db2777',
          purple: '#c084fc',
          'purple-dark': '#9333ea',
          yellow: '#facc15',
          'yellow-dark': '#eab308',
          green: '#4ade80',
          'green-dark': '#16a34a',
          orange: '#fb923c',
          'orange-dark': '#ea580c',
          coral: '#ff6b6b',
          teal: '#2dd4bf',
          sky: '#bae6fd',
          surface: '#ffffff',
          'surface-dark': '#1e1b4b',
          cloud: '#f0fdf4',
        }
      },
      fontFamily: {
        arabic: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
        playful: ['"Fredoka"', 'Tajawal', 'cursive', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 0.8s ease-in-out infinite',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(250, 204, 21, 0.6)' },
          '50%': { boxShadow: '0 0 30px rgba(250, 204, 21, 0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'game-button': '0 8px 0 rgba(0, 0, 0, 0.15)',
        'game-button-active': '0 2px 0 rgba(0, 0, 0, 0.15)',
        'card-pop': '0 12px 28px -4px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.5)',
        'glow-pink': '0 0 25px rgba(244, 114, 182, 0.5)',
        'glow-yellow': '0 0 25px rgba(250, 204, 21, 0.6)',
        'glow-green': '0 0 25px rgba(74, 222, 128, 0.5)',
      }
    },
  },
  plugins: [],
}
