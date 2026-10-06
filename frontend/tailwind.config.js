module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080808',
          card: 'rgba(255, 255, 255, 0.035)',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.06)',
          text: '#F5F5F5',
          secondary: '#A1A1AA',
          muted: '#737373',
        },
        light: {
          bg: '#F7F7F7',
          card: '#FFFFFF',
          border: '#E5E5E5',
          hover: '#F0F0F0',
          text: '#171717',
          secondary: '#666666',
          muted: '#8C8C8C',
        },
        cleanblue: {
          50: '#F0F7FF',
          500: '#0284C7',
          600: '#0369A1',
          700: '#075985',
        },
      },
      boxShadow: {
        'glass-dark': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.4)',
        'glass-card': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 2px 6px rgba(0, 0, 0, 0.25)',
        'subtle-light': '0 1px 3px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
