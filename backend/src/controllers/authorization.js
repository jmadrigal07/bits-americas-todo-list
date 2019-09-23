import config from "../config";
import jwt from 'jsonwebtoken';

class authorization {
    constructor(){}

    verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            req.token = bearer[1];
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    }

    genJwt () {
        const dataLogin = {
            auth: true,
            company: 'BitsAmericas'
        }
        const token = jwt.sign( {dataLogin}, config.JWT_TOKEN);
        return token;
    }
}

module.exports = {
    authorization
}