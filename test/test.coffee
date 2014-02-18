should = require 'should'
fs = require 'fs'
path = require 'path'
autoprefixer = require '../index'
stylus = require 'stylus'
parse = require 'css-parse'
test_path = path.join(__dirname, 'fixtures')

match_expected = (file, args, done) ->
  stylus(fs.readFileSync(path.join(test_path, file), 'utf8'))
    .use(autoprefixer.apply(autoprefixer, args))
    .render (err, css) ->
      if err then return done(err)
      expected = fs.readFileSync(path.join(test_path, file.replace('.styl', '.css')), 'utf8')
      parse(css).should.eql(parse(expected))
      done()

describe 'basic', ->

  it "works", (done) ->
    match_expected('basic.styl', null, done)

  it "doesn't bail when given whack arguments", (done) ->
    match_expected('basic.styl', [{}], done)

  it "takes browser options", (done) ->
    match_expected('browser.styl', ['ie 7', 'ie 8'], done)
