import express from 'express';
import bodyParser from "body-parser";
import http from 'http';
import jwt from 'jsonwebtoken';
import config from "./config";
import { authorization } from './controllers/authorization';
import { tasks } from './controllers/tasks';

const app = express();
const auth = new authorization();
const taskControll = new tasks();

app.use('/apidoc', express.static('apidoc'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
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
app.get('/token', (req, res) => {
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
app.get('/status', auth.verifyToken, (req, res) => {
  jwt.verify(req.token, config.JWT_TOKEN, async (err, authContent) => {
    if (!err)
      res.json({ result: await taskControll.getStatus() });
    else
      res.status(403).send("Error with the JWT Token");
  });
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
app.get('/tasks', auth.verifyToken, (req, res) => {
  jwt.verify(req.token, config.JWT_TOKEN, async (err, authContent) => {
    if (!err)
      res.json({ result: await taskControll.getTasks() });
    else
      res.status(403).send("Error with the JWT Token");
  });
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
app.get('/task/:id', auth.verifyToken, (req, res) => {
  jwt.verify(req.token, config.JWT_TOKEN, async (err, authContent) => {
    if (!err) {
      const taskid = req.params.id;
      res.json({ result: await taskControll.getTask(taskid) });
    } else
      res.status(403).send("Error with the JWT Token");
  });
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
app.post('/task', auth.verifyToken, (req, res) => {
  jwt.verify(req.token, config.JWT_TOKEN, async (err, authContent) => {
    if (!err) {
      const statusid  = req.body.status_id;
      const message   = req.body.message;
      res.json({
        result: await taskControll.createTask(message, statusid)
      });
    } else
      res.status(403).send("Error with the JWT Token");
  });
});

/**
 * @api {put} /task/:id Request to update task
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
app.put('/task/:id', auth.verifyToken, (req, res) => {
  jwt.verify(req.token, config.JWT_TOKEN, async (err, authContent) => {
    if (!err) {
      const taskid    = req.params.id;
      const statusid  = req.body.status_id;
      const message   = req.body.message;
      res.json({
        result: await taskControll.updateTask(taskid, message, statusid)
      });
    } else
      res.status(403).send("Error with the JWT Token");
  });
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
app.delete('/task/:id', auth.verifyToken, (req, res) => {
  jwt.verify(req.token, config.JWT_TOKEN, async (err, authContent) => {
    if (!err) {
      const taskid    = req.params.id;
      res.json({
        result: await taskControll.deleteTask(taskid)
      });
    } else
      res.status(403).send("Error with the JWT Token");
  });
});

http.createServer(app).listen(config.configs.web.port, () => {
  console.log(`Server started at ${config.configs.web.url}:${config.configs.web.port}`);
});