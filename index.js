var ap = require('autoprefixer-core'),
    path = require('path');

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
    var filename = style.options.filename;

    style.on('end', function(err, css){
      process_opts = {
        from: filename,
        to: path.join(
          path.dirname(filename),
          path.basename(filename, path.extname(filename))
        ) + '.css'
      }

      if (opts) { return ap(opts).process(css, process_opts).css; }
      return ap.process(css, process_opts).css;
    });

  }

}
