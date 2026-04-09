import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand palette (extraído del diseño de referencia) ──
        orange: {
          DEFAULT: '#FF6B2B',
          lt:      'rgba(255,107,43,0.11)',
          bd:      'rgba(255,107,43,0.28)',
        },
        pink: { DEFAULT: '#FF6BAA' },
        // ── Neutrales de la app ──
        ink: {
          DEFAULT: '#1a1a1a',
          87: 'rgba(0,0,0,0.87)',
          55: 'rgba(0,0,0,0.55)',
          35: 'rgba(0,0,0,0.35)',
          13: 'rgba(0,0,0,0.13)',
          8:  'rgba(0,0,0,0.08)',
        },
        surface: {
          0: '#f8f8f8',
          1: '#ffffff',
          2: '#f5f5f5',
          3: '#eeeeee',
          4: '#e4e4e4',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card:    '0 2px 8px rgba(0,0,0,0.07)',
        'card-lg': '0 14px 44px rgba(0,0,0,0.13)',
        orange:  '0 4px 14px rgba(255,107,43,0.25)',
      },
    },
  },
  plugins: [],
}

export default config
