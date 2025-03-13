/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Couleurs identitaires (basées sur le drapeau)
        'benin': {
          'green': {
            DEFAULT: '#008751', // Vert principal
            50: '#E6F7EF',
            100: '#C2EAD6',
            200: '#8AD8B3',
            300: '#52C68F',
            400: '#1AB46C',
            500: '#008751', // Original 
            600: '#00704A',
            700: '#005940',
            800: '#004530',
            900: '#00301F'
          },
          'yellow': {
            DEFAULT: '#FCD116', // Jaune principal
            50: '#FFF9E6',
            100: '#FEF3CC',
            200: '#FDE899',
            300: '#FCDC66',
            400: '#FCD733',
            500: '#FCD116', // Original
            600: '#DAB000',
            700: '#A78600',
            800: '#755D00',
            900: '#423500'
          },
          'red': {
            DEFAULT: '#E8112D', // Rouge principal
            50: '#FCEAEC',
            100: '#F9D0D6',
            200: '#F3A1AC',
            300: '#ED7283',
            400: '#E84359',
            500: '#E8112D', // Original
            600: '#BC0E24',
            700: '#900B1C',
            800: '#650813',
            900: '#38050B'
          }
        },
        
        // Couleurs d'ambiance (mystiques et naturelles)
        'vodou': {
          DEFAULT: '#8B5CF6', // Violet principal 
          'light': '#A78BFA',
          'dark': '#7C3AED'
        },
        'spirit': {
          DEFAULT: '#5D3587', // Violet profond
          'light': '#8B5FBF',
          'dark': '#3F2473'
        },
        'earth': {
          DEFAULT: '#92400E', // Terre/sable
          'light': '#B45309',
          'dark': '#78350F'
        },
        'ocean': {
          DEFAULT: '#0369A1', // Bleu océan
          'light': '#0284C7',
          'dark': '#075985'
        },
        
        // Couleurs neutres
        'night': {
          DEFAULT: '#0F172A', // Nuit profonde
          'light': '#1E293B',
          'dark': '#020617'
        },
        'clay': {
          DEFAULT: '#78716C', // Argile (neutre chaud)
          'light': '#A8A29E',
          'dark': '#57534E'
        },
        
        // Couleurs d'accent
        'accent': {
          'teal': '#14B8A6',    // Turquoise (plans d'eau)
          'amber': '#D97706',   // Ambre (couchers de soleil)
          'rose': '#E11D48'     // Rose vif (fleurs locales)
        }
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slower': 'spin 15s linear infinite',
        'spin-reverse': 'spin-reverse 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
    },
  },
  plugins: [],
} 