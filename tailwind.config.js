module.exports = {
  purge: {
    mode: 'all',
    preserveHtmlElements: false,
    content: ['./src/*.html', './src/*.js']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
