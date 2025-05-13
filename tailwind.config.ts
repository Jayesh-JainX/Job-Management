import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7E3AF2',
        secondary: '#00A3FF',
        'gray-light': '#F9FAFB',
        'gray-dark': '#4B5563',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

export default config;