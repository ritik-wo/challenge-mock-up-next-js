import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6f7fb',
          100: '#eef0f7',
          200: '#dfe3ef',
          300: '#c6cee3',
          400: '#9eafd0',
          500: '#1a2238', // dark navy for buttons
          600: '#11182a',
        }
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,0.05), 0 1px 3px rgba(16,24,40,0.1)'
      },
      borderRadius: {
        xl: '12px'
      },
      fontFamily: {
        sans: ['var(--default-font-family)']
      }
    },
  },
  plugins: [],
}
export default config
