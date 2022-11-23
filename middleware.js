const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY;
const tokenHeader = process.env.TOKEN_HEADER_KEY;

module.exports = function(req, res, next) {
    try {
        let token = req.header(tokenHeader);
        if (!token) {
            return res.send('Token not found');
        }
        let decode = jwt.verify(token, jwtSecret);
        req.user = decode.user;
        next();

    } catch (error) {
        console.log(error);
        return res.send('Invalid Token');
    }
}