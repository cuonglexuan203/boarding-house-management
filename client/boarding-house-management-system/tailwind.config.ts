import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'page-background': "url('/img/background.jpg')",
      },
      colors: {
        text: '#050315',
        background: '#fbfbfe',
        primary: '#2f27ce',
        secondary: '#dedcff',
        accent: '#433bff',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};

export default config;
