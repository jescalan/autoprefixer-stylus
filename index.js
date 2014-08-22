var ap = require('autoprefixer-core');

/**
 * Returns a stylus function that autoprefixes css.
 *
 * - Grabs any arguments passed, filters down to only string
 *   args, as anything other than a string crashes autoprefixer
 * - Returns a function for stylus to use
 * - This function uses the `end` event, and runs autoprefixer on
 *   the css, applying any arguments if present
 *   
 * @return {Function} - stylus plugin function
 */

module.exports = function(opts) {

  return function(style){
    style = this || style;

    style.on('end', function(err, css){
      if (opts) { return ap(opts).process(css).css; }
      return ap.process(css).css;
    });

  }

}
