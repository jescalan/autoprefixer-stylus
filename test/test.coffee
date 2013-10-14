should = require 'should'
fs = require 'fs'
path = require 'path'
autoprefixer = require '../index'
stylus = require 'stylus'

describe 'basic', ->

  it 'works', (done) ->
    contents = fs.readFileSync(path.join(__dirname, 'basic/example.styl'), 'utf8')
    expected = fs.readFileSync(path.join(__dirname, 'basic/expected.css'), 'utf8')

    stylus(contents).use(autoprefixer()).render (err, out) ->
      # this is absurd, but it comes back as undefined unless wrapped like this...
      process.nextTick ->
        should.equal(out, expected)
        done()
