/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0F172A', // Near-black (primary)
          800: '#1E293B',
          600: '#2563EB',  // Vibrant blue (accent)
          500: '#3B82F6',
          400: '#60A5FA',
          100: '#DBEAFE',
          50: '#F8FAFC',
        },
        eco: {
          600: '#059669', // Emerald (eco/success)
          500: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};