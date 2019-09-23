"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _http = _interopRequireDefault(require("http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

var _authorization = require("./controllers/authorization");

var _tasks = require("./controllers/tasks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
var auth = new _authorization.authorization();
var taskControll = new _tasks.tasks();
app.use('/apidoc', _express["default"]["static"]('apidoc'));
app.use(_bodyParser["default"].json()); // to support JSON-encoded bodies

app.use(_bodyParser["default"].urlencoded({
  // to support URL-encoded bodies
  extended: true
}));
/**
 * @api {get} /Token/ Request get token authentication
 * @apiName getToken
 * @apiGroup Authentication
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "token": "jwt-Token"
 *   }
 */

app.get('/token', function (req, res) {
  res.json({
    token: auth.genJwt()
  });
});
/**
 * @api {get} /status/ Request get status list
 * @apiName getStatus
 * @apiGroup Tasks
 *
 * @apiSuccess {Number} id Status id.
 * @apiSuccess {String} name title of status.
 * @apiSuccess {Date} created_at date of creation.
 * @apiSuccess {Date} updated_at date of updated.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 1,
 *     "name": "Open",
 *     "created_at": "2019-09-23T04:21:05.702Z",
 *     "updated_at": "2019-09-23T04:21:05.702Z"
 *   }
 */

app.get('/status', auth.verifyToken, function (req, res) {
  _jsonwebtoken["default"].verify(req.token, _config["default"].JWT_TOKEN,
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(err, authContent) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (err) {
                _context.next = 9;
                break;
              }

              _context.t0 = res;
              _context.next = 4;
              return taskControll.getStatus();

            case 4:
              _context.t1 = _context.sent;
              _context.t2 = {
                result: _context.t1
              };

              _context.t0.json.call(_context.t0, _context.t2);

              _context.next = 10;
              break;

            case 9:
              res.status(403).send("Error with the JWT Token");

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
});
/**
 * @api {get} /tasks/ Request get tasks list
 * @apiName getTasks
 * @apiGroup Tasks
 *
 * @apiSuccess {Number} id Task id.
 * @apiSuccess {String} message Task Message.
 * @apiSuccess {Number} status Status id.
 * @apiSuccess {Date} created_at date of creation.
 * @apiSuccess {Date} updated_at date of updated.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 3,
 *     "message": "Message",
 *     "status": 3,
 *     "created_at": "2019-09-23T04:21:05.953Z",
 *     "updated_at": "2019-09-23T04:21:05.953Z"
 *   }
 */

app.get('/tasks', auth.verifyToken, function (req, res) {
  _jsonwebtoken["default"].verify(req.token, _config["default"].JWT_TOKEN,
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(err, authContent) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (err) {
                _context2.next = 9;
                break;
              }

              _context2.t0 = res;
              _context2.next = 4;
              return taskControll.getTasks();

            case 4:
              _context2.t1 = _context2.sent;
              _context2.t2 = {
                result: _context2.t1
              };

              _context2.t0.json.call(_context2.t0, _context2.t2);

              _context2.next = 10;
              break;

            case 9:
              res.status(403).send("Error with the JWT Token");

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
});
/**
 * @api {get} /task/:id Request get task
 * @apiName getTask
 * @apiGroup Tasks
 *
 * @apiParam {Number} id task unique ID
 *
 * @apiSuccess {Number} id Task id.
 * @apiSuccess {String} message Task Message.
 * @apiSuccess {Number} status Status id.
 * @apiSuccess {Date} created_at date of creation.
 * @apiSuccess {Date} updated_at date of updated.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 3,
 *     "message": "Message",
 *     "status": 3,
 *     "created_at": "2019-09-23T04:21:05.953Z",
 *     "updated_at": "2019-09-23T04:21:05.953Z"
 *   }
 */

app.get('/task/:id', auth.verifyToken, function (req, res) {
  _jsonwebtoken["default"].verify(req.token, _config["default"].JWT_TOKEN,
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(err, authContent) {
      var taskid;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (err) {
                _context3.next = 10;
                break;
              }

              taskid = req.params.id;
              _context3.t0 = res;
              _context3.next = 5;
              return taskControll.getTask(taskid);

            case 5:
              _context3.t1 = _context3.sent;
              _context3.t2 = {
                result: _context3.t1
              };

              _context3.t0.json.call(_context3.t0, _context3.t2);

              _context3.next = 11;
              break;

            case 10:
              res.status(403).send("Error with the JWT Token");

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
});
/**
 * @api {post} /task/ Request to create task
 * @apiName createTask
 * @apiGroup Tasks
 *
 * @apiParam {Number} status_id status id
 * @apiParam {String} message task message
 *
 * @apiSuccess {Number} id Task id.
 * @apiSuccess {String} message Task Message.
 * @apiSuccess {Number} status Status id.
 * @apiSuccess {Date} created_at date of creation.
 * @apiSuccess {Date} updated_at date of updated.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 3,
 *     "message": "Message",
 *     "status": 3,
 *     "created_at": "2019-09-23T04:21:05.953Z",
 *     "updated_at": "2019-09-23T04:21:05.953Z"
 *   }
 */

app.post('/task', auth.verifyToken, function (req, res) {
  _jsonwebtoken["default"].verify(req.token, _config["default"].JWT_TOKEN,
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(err, authContent) {
      var statusid, message;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (err) {
                _context4.next = 11;
                break;
              }

              statusid = req.body.status_id;
              message = req.body.message;
              _context4.t0 = res;
              _context4.next = 6;
              return taskControll.createTask(message, statusid);

            case 6:
              _context4.t1 = _context4.sent;
              _context4.t2 = {
                result: _context4.t1
              };

              _context4.t0.json.call(_context4.t0, _context4.t2);

              _context4.next = 12;
              break;

            case 11:
              res.status(403).send("Error with the JWT Token");

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
});
/**
 * @api {put} /task/ Request to update task
 * @apiName updateTask
 * @apiGroup Tasks
 *
 * @apiParam {Number} id taskid
 * @apiParam {Number} status_id status id
 * @apiParam {String} message task message
 *
 * @apiSuccess {Number} id Task id.
 * @apiSuccess {String} message Task Message.
 * @apiSuccess {Number} status Status id.
 * @apiSuccess {Date} created_at date of creation.
 * @apiSuccess {Date} updated_at date of updated.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 3,
 *     "message": "Message",
 *     "status": 3,
 *     "created_at": "2019-09-23T04:21:05.953Z",
 *     "updated_at": "2019-09-23T04:21:05.953Z"
 *   }
 */

app.put('/task/:id', auth.verifyToken, function (req, res) {
  _jsonwebtoken["default"].verify(req.token, _config["default"].JWT_TOKEN,
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(err, authContent) {
      var taskid, statusid, message;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (err) {
                _context5.next = 12;
                break;
              }

              taskid = req.params.id;
              statusid = req.body.status_id;
              message = req.body.message;
              _context5.t0 = res;
              _context5.next = 7;
              return taskControll.updateTask(taskid, message, statusid);

            case 7:
              _context5.t1 = _context5.sent;
              _context5.t2 = {
                result: _context5.t1
              };

              _context5.t0.json.call(_context5.t0, _context5.t2);

              _context5.next = 13;
              break;

            case 12:
              res.status(403).send("Error with the JWT Token");

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
});
/**
 * @api {delete} /task/:id Request to delete task
 * @apiName deleteTask
 * @apiGroup Tasks
 *
 * @apiParam {Number} id taskid
 *
 * @apiSuccess {Number} id Task id.
 * @apiSuccess {String} message Task Message.
 * @apiSuccess {Number} status Status id.
 * @apiSuccess {Date} created_at date of creation.
 * @apiSuccess {Date} updated_at date of updated.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 3,
 *     "message": "Message",
 *     "status": 3,
 *     "created_at": "2019-09-23T04:21:05.953Z",
 *     "updated_at": "2019-09-23T04:21:05.953Z"
 *   }
 */

app["delete"]('/task/:id', auth.verifyToken, function (req, res) {
  _jsonwebtoken["default"].verify(req.token, _config["default"].JWT_TOKEN,
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(err, authContent) {
      var taskid;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (err) {
                _context6.next = 10;
                break;
              }

              taskid = req.params.id;
              _context6.t0 = res;
              _context6.next = 5;
              return taskControll.deleteTask(taskid);

            case 5:
              _context6.t1 = _context6.sent;
              _context6.t2 = {
                result: _context6.t1
              };

              _context6.t0.json.call(_context6.t0, _context6.t2);

              _context6.next = 11;
              break;

            case 10:
              res.status(403).send("Error with the JWT Token");

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
});

_http["default"].createServer(app).listen(_config["default"].configs.web.port, function () {
  console.log("Server started at ".concat(_config["default"].configs.web.url, ":").concat(_config["default"].configs.web.port));
});