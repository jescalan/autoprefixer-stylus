const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const map = require('multi-stage-sourcemap')
const path = require('path')

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

module.exports = function(opts = {}) {
  // pull `hideWarnings` out so we can pass opts to autoprefixer
  const showWarnings = !opts.hideWarnings
  delete opts.hideWarnings

  return function(style) {
    style = this || style
    const filename = style.options.filename

    style.on('end', function(err, css) {
      if (err) throw new Error(err)
      // configure the options to be passed to autoprefixer
      const processOpts = {
        from: filename,
        to:
          path.join(
            path.dirname(filename),
            path.basename(filename, path.extname(filename))
          ) + '.css'
      }

      // if there is a stylus sourcemap, ensure autoprefixer also generates one
      if (style.sourcemap) {
        processOpts.map = { annotation: false }
      }

      // run autoprefixer
      var res = postcss([autoprefixer(opts)]).process(css, processOpts)

      // if sourcemaps are generated, combine the two
      if (res.map && style.sourcemap) {
        var combinedMap = map.transfer({
          fromSourceMap: res.map.toString(),
          toSourceMap: style.sourcemap
        })

        // then set the combined result as the new sourcemap
        style.sourcemap = JSON.parse(combinedMap)
      }

      if (showWarnings) {
        res.warnings().forEach(console.error)
      }

      // return the css output
      return res.css
    })
  }
}
