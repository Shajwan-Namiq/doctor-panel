/** @type {import('tailwindcss').Config}*/

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        },
        bg_color: '#1E1E1E',
        light_gray: '#F5F5F5',
        primary: '#04ABE0',
        bg_main: '#F1F1F1',
        bg_section:'#FFFFFF'
         
      }
    }
  }
};

module.exports = config;
