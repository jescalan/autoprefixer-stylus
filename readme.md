Autoprefixer Stylus
-------------------

An [autoprefixer](https://github.com/ai/autoprefixer) plugin for stylus.

[![tests](https://travis-ci.org/jenius/autoprefixer-stylus.svg?branch=master)](https://travis-ci.org/jenius/autoprefixer-stylus)
[![npm](https://badge.fury.io/js/autoprefixer-stylus.svg)](http://badge.fury.io/js/autoprefixer-stylus)
[![coverage](http://img.shields.io/coveralls/jenius/autoprefixer-stylus.svg)](https://coveralls.io/r/jenius/autoprefixer-stylus)
[![dependencies](https://david-dm.org/jenius/autoprefixer-stylus.svg)](https://david-dm.org/jenius/autoprefixer-stylus)

### Installation

You can install through npm as such: `npm install autoprefixer-stylus`

### Usage

You can include autoprefixer-stylus as a normal stylus plugin. Basic example below:

```js
var stylus = require('stylus');
var autoprefixer = require('autoprefixer-stylus');

stylus(css)
  .use(autoprefixer())
  .render(function(err, output){
    console.log(output);
  });
```

This plugin also takes any of the [options that autoprefixer normally takes](), which at the time of writing is `browsers` and `cascade`. Example with `browsers` below:

```js
stylus(css)
  .use(autoprefixer({ browsers: ['ie 7', 'ie 8'] }));
```

If you'd like to install globally and run from the command line, you can do it like this:

```js
npm install -g autoprefixer-stylus
stylus -u autoprefixer-stylus -c example.styl
```
