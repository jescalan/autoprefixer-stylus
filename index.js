var autoprefixer = require('autoprefixer');

module.exports = function(opts) {
  return function(style){
    style.on('end', function(css, cb){
      cb(null, autoprefixer.compile(css));
    });
  }
}
