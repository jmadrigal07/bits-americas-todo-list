"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeSql = exports["default"] = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _knexfile = _interopRequireDefault(require("../knexfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var knex = (0, _knex["default"])(_knexfile["default"]);
exports["default"] = knex;

var executeSql = function executeSql(sql) {
  return knex.raw(sql);
};

exports.executeSql = executeSql;