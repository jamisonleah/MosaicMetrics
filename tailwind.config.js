/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        Nunito: ['Nunito', "sans-serif"],
        Rubik: ['Rubik Moonrocks', "cursive"]
    },
    colors: {
      'money-green': "#B3B06C"
    }
    
  },
  plugins: [],
}
}
