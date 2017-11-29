module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'last 2 version',
        '> 5%',
        'ie > 9'
      ]
    })
  ]
};
