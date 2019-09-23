"use strict";

var _knex = _interopRequireDefault(require("../knex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var tasks =
/*#__PURE__*/
function () {
  function tasks() {
    _classCallCheck(this, tasks);
  }

  _createClass(tasks, [{
    key: "getTasks",
    value: function () {
      var _getTasks = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _knex["default"].select('*').from('tasks');

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", {
                  error: true,
                  message: _context.t0
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function getTasks() {
        return _getTasks.apply(this, arguments);
      }

      return getTasks;
    }()
  }, {
    key: "getTask",
    value: function () {
      var _getTask = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!Number.isInteger(id * 1)) {
                  _context2.next = 12;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return _knex["default"].select('*').from('tasks').where('id', id);

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", {
                  error: true,
                  message: _context2.t0
                });

              case 10:
                _context2.next = 13;
                break;

              case 12:
                return _context2.abrupt("return", {
                  error: true,
                  message: 'Id is not integer'
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 7]]);
      }));

      function getTask(_x) {
        return _getTask.apply(this, arguments);
      }

      return getTask;
    }()
  }, {
    key: "createTask",
    value: function () {
      var _createTask = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(message, status_id) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!Number.isInteger(status_id * 1)) {
                  _context3.next = 13;
                  break;
                }

                _context3.prev = 1;
                data = [{
                  message: message,
                  status: status_id * 1
                }];
                _context3.next = 5;
                return _knex["default"].insert(data).returning('*').into('tasks');

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", {
                  error: true,
                  message: _context3.t0
                });

              case 11:
                _context3.next = 14;
                break;

              case 13:
                return _context3.abrupt("return", {
                  error: true,
                  message: 'Status_id is not integer'
                });

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 8]]);
      }));

      function createTask(_x2, _x3) {
        return _createTask.apply(this, arguments);
      }

      return createTask;
    }()
  }, {
    key: "updateTask",
    value: function () {
      var _updateTask = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id, message, status_id) {
        var data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(Number.isInteger(id * 1) && Number.isInteger(status_id * 1))) {
                  _context4.next = 13;
                  break;
                }

                _context4.prev = 1;
                data = {
                  message: message,
                  status: status_id * 1,
                  updated_at: _knex["default"].fn.now()
                };
                _context4.next = 5;
                return (0, _knex["default"])('tasks').returning('*').where('id', '=', id).update(data);

              case 5:
                return _context4.abrupt("return", _context4.sent);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", {
                  error: true,
                  message: _context4.t0
                });

              case 11:
                _context4.next = 14;
                break;

              case 13:
                return _context4.abrupt("return", {
                  error: true,
                  message: 'ID or Status_id is not integer'
                });

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));

      function updateTask(_x4, _x5, _x6) {
        return _updateTask.apply(this, arguments);
      }

      return updateTask;
    }()
  }, {
    key: "deleteTask",
    value: function () {
      var _deleteTask = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!Number.isInteger(id * 1)) {
                  _context5.next = 12;
                  break;
                }

                _context5.prev = 1;
                _context5.next = 4;
                return (0, _knex["default"])('tasks').returning('*').where('id', '=', id)["delete"]();

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", {
                  error: true,
                  message: _context5.t0
                });

              case 10:
                _context5.next = 13;
                break;

              case 12:
                return _context5.abrupt("return", {
                  error: true,
                  message: 'ID is not integer'
                });

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 7]]);
      }));

      function deleteTask(_x7) {
        return _deleteTask.apply(this, arguments);
      }

      return deleteTask;
    }()
  }, {
    key: "getStatus",
    value: function () {
      var _getStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _knex["default"].select('*').from('status');

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", {
                  error: true,
                  message: _context6.t0
                });

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 6]]);
      }));

      function getStatus() {
        return _getStatus.apply(this, arguments);
      }

      return getStatus;
    }()
  }]);

  return tasks;
}();

module.exports = {
  tasks: tasks
};