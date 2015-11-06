/* jshint node: true */
'use strict';

var expect = require('chai').expect;
var filterDirectories = require('../lib/filterDirectories');

describe("filter directories", function() {
  it("returns an array of pathes as expectResult", function(done){
    var expectResult = [
      __dirname + "/fixtures/mod_a/", __dirname + "/fixtures/mod_b/"
    ];
    function test(err, result) {
      expect(result).to.have.length(2).and.has.same.members(expectResult);
      done();
    }
    filterDirectories(__dirname + '/fixtures', test);
  });
});
