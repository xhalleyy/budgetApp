/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
		"./pages/**/*.html",
    "./*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ], 
  theme: {
    extend: {
      fontFamily: {
        'quick-reg' : ['quick-reg'],
        'quick-med' : ['quick-med'],
        'quick-bold' : ['quick-bold'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}