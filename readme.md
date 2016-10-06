Autoprefixer Stylus
-------------------

An [autoprefixer](https://github.com/postcss/autoprefixer) plugin for stylus.

[![npm](https://img.shields.io/npm/v/autoprefixer-stylus.svg?style=flat)](http://badge.fury.io/js/autoprefixer-stylus)
[![tests](https://img.shields.io/travis/jescalan/autoprefixer-stylus/master.svg?style=flat)](https://travis-ci.org/jescalan/autoprefixer-stylus)
[![coverage](https://img.shields.io/coveralls/jescalan/autoprefixer-stylus/master.svg?style=flat)](https://coveralls.io/r/jescalan/autoprefixer-stylus)
[![dependencies](https://img.shields.io/david/jescalan/autoprefixer-stylus.svg?style=flat)](https://david-dm.org/jescalan/autoprefixer-stylus)

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

By default, this plugin will display any warnings. You can disable this with the `hideWarnings` option. Example below:

```js
stylus(css)
  .use(autoprefixer({hideWarnings: true});
```

If you'd like to install globally and run from the command line, you can do it like this:

```js
npm install -g autoprefixer-stylus
stylus -u autoprefixer-stylus -c example.styl
```
