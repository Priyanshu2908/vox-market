const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {

    const token = req.headers['x-auth-token'];
    if(!token){
        res.status(403).json({message : 'Token not provided'});
    }else{
        jwt.verify(token, process.env.SECRETE_KEY, (err) => {
            if(err,payload){
                res.status(500).json(err);
            }else{
                req.user = payload;
                next();
            }
        })
    }
}

module.exports = verifyToken;