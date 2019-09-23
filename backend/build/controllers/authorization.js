"use strict";

var _config = _interopRequireDefault(require("../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var authorization =
/*#__PURE__*/
function () {
  function authorization() {
    _classCallCheck(this, authorization);
  }

  _createClass(authorization, [{
    key: "verifyToken",
    value: function verifyToken(req, res, next) {
      var bearerHeader = req.headers['authorization'];

      if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
      } else {
        // Forbidden
        res.sendStatus(403);
      }
    }
  }, {
    key: "genJwt",
    value: function genJwt() {
      var dataLogin = {
        auth: true,
        company: 'BitsAmericas'
      };

      var token = _jsonwebtoken["default"].sign({
        dataLogin: dataLogin
      }, _config["default"].JWT_TOKEN);

      return token;
    }
  }]);

  return authorization;
}();

module.exports = {
  authorization: authorization
};