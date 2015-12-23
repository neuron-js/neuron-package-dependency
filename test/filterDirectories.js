/* jshint node: true */
'use strict';

var expect = require('chai').expect;
var filterDirectories = require('../lib/filterDirectories');

var options = {};

describe("filter directories", function() {
  it("returns an array of pathes as expectResult", function(done){
    var expectResult = [
      __dirname + "/fixtures/mod_a/", __dirname + "/fixtures/mod_b/", __dirname +  "/fixtures/mod_c/"
    ];
    function test(err, result) {
      expect(result).to.have.length(3).and.has.same.members(expectResult);
      done();
    }
    filterDirectories(__dirname + '/fixtures', options, test);
  });
});
