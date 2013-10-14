Autoprefixer Stylus
-------------------

An [autoprefixer](https://github.com/ai/autoprefixer) plugin for stylus.

### Installation

Just run `npm install autoprefixer-stylus --save` in your project's directory.

### Usage

You can include autoprefixer-stylus as a normal stylus plugin. Basic example below:

```js
var stylus = require('stylus');
var autoprefixer = require('autoprefixer-stylus');

stylus(css)
  .use(autoprefixer)
  .render(function(err, output){
    console.log(output);
  });
```
