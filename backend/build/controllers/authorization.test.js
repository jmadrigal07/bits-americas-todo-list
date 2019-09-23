"use strict";

var _authorization = require("./authorization");

var _config = require("../config");

var auth = new _authorization.authorization();
var expect = global.expect;
describe('Authorization test', function () {
  describe('Generate JWT Token', function () {
    test('Should be generate a JWT Token', function () {
      var jwt = auth.genJwt();
      expect.stringContaining(jwt);
    });
  });
});