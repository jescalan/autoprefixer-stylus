fs        = require 'fs'
path      = require 'path'
stylus    = require 'stylus'
parse     = require 'css-parse'
test_path = path.join(__dirname, 'fixtures')

match_expected = (file, args, done) ->
  stylus(fs.readFileSync(path.join(test_path, file), 'utf8'))
    .use(autoprefixer(args))
    .render (err, css) ->
      if err then return done(err)
      expected = fs.readFileSync(path.join(test_path, file.replace('.styl', '.css')), 'utf8')
      parse(css).should.eql(parse(expected))
      done()

describe 'basic', ->

  it "works", (done) ->
    match_expected('basic.styl', null, done)

  it "doesn't bail when given whack arguments", (done) ->
    match_expected('basic.styl', { foo: 'bar' }, done)

  it "takes browser options", (done) ->
    match_expected('browser.styl', { browsers: ['ie 7', 'ie 8'] }, done)

  it "returns correct sourcemaps", (done) ->
    filename = path.join(test_path, 'basic.styl')

    style = stylus(fs.readFileSync(filename, 'utf8'))
      .set('sourcemap', true)
      .set('filename', filename)
      .use(autoprefixer())

    style.render (err, css) ->
        if err then return done(err)
        style.sourcemap.should.be.an('object')
        style.sourcemap.sources[0].should.equal('stylus')
        style.sourcemap.version.should.equal(3)
        style.sourcemap.mappings.should.equal('AAAA;EACE,uBAAA;EAAA,sBAAA;EAAA,eAAA')
        done()
