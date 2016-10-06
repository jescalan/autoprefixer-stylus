var ap = require('autoprefixer'),
    postcss = require('postcss'),
    map = require('multi-stage-sourcemap'),
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
  if (!opts) { opts = {}; }

  // pull `hideWarnings` out so we can pass opts to autoprefixer
  var showWarnings = !opts.hideWarnings;
  delete opts.hideWarnings;

  return function(style){
    style = this || style;
    var filename = style.options.filename;

    style.on('end', function(err, css){

      // configure the options to be passed to autoprefixer
      var process_opts = {
        from: filename,
        to: path.join(
          path.dirname(filename),
          path.basename(filename, path.extname(filename))
        ) + '.css'
      }

      // if there is a stylus sourcemap, ensure autoprefixer also generates one
      if (style.sourcemap) {
        process_opts.map = { annotation: false }
      }

      // run autoprefixer
      var res = postcss([ap(opts)]).process(css, process_opts);

      // if sourcemaps are generated, combine the two
      if (res.map && style.sourcemap) {
        var combined_map = map.transfer({
          fromSourceMap: res.map.toString(),
          toSourceMap: style.sourcemap
        });

        // then set the combined result as the new sourcemap
        style.sourcemap = JSON.parse(combined_map);
      }

      if (showWarnings) {
        res.warnings().forEach(console.error);
      }

      // return the css output
      return res.css;
    });

  }

}
