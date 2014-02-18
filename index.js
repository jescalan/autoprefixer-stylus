var ap = require('autoprefixer');

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

module.exports = function() {
  var args = Array.prototype.slice.call(arguments);
  args = args.filter(function(i){ return typeof i === 'string' });

  return function(style){
    style = this || style;

    style.on('end', function(err, css){
      if (args.length) { return ap.apply(ap, args).process(css).css; }
      return ap.process(css).css;
    });

  }

}
