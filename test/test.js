const autoprefixer = require("../");
const chai = require("chai");
const parse = require("css-parse");
const fs = require("fs");
const path = require("path");
const stylus = require("stylus");

const test_path = path.join(__dirname, "fixtures");

const should = chai.should();

const match_expected = (file, args, done) => {
  stylus(fs.readFileSync(path.join(test_path, file), "utf8"))
    .use(autoprefixer(args))
    .render((err, css) => {
      if (err) {
        return done(err);
      }

      const expected = fs.readFileSync(
        path.join(test_path, file.replace(".styl", ".css")),
        "utf8"
      );

      parse(css).should.eql(parse(expected));

      done();
    });
};

describe("basic", function() {
  it("works", function(done) {
    match_expected("basic.styl", null, done);
  });

  it("doesn't bail when given whack arguments", function(done) {
    match_expected(
      "basic.styl",
      {
        foo: "bar"
      },
      done
    );
  });

  it("takes browser options", function(done) {
    match_expected(
      "browser.styl",
      {
        browsers: ["last 2 versions"],
        grid: true
      },
      done
    );
  });

  it("returns correct sourcemaps", function(done) {
    const filename = path.join(test_path, "basic.styl");

    const style = stylus(fs.readFileSync(filename, "utf8"))
      .set("sourcemap", true)
      .set("filename", filename)
      .use(autoprefixer());

    style.render((err, css) => {
      if (err) {
        return done(err);
      }

      style.sourcemap.should.be.an("object");
      style.sourcemap.sources[0].should.equal("stylus");
      style.sourcemap.version.should.equal(3);
      style.sourcemap.mappings.should.equal("AAAA;EACE,cAAA");

      done();
    });
  });
});
