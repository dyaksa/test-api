const jwt = require('jsonwebtoken');

exports.validJWTNeeded = async (req, res, next) => {
    try {
        const tokenHeader = req.headers['authorization'];
        if(!tokenHeader){
        return res.status(401).send({
            status: 401,
            message: 'No token provided'
        })
    }

        if(tokenHeader.split(' ')[0] !== 'Bearer'){
        return res.status(401).send({
            status: 401,
            message: 'Token has not valid'
        })
    }

    const decoded = jwt.verify(tokenHeader.split(' ')[1], process.env.JWT_SECRET);
    req.jwt = decoded;
    return next();
    }catch(err){
        if(err.name == "TokenExpiredError"){
        return res.status(401).send({
            status: 401,
            message: 'access token expired'
        })
        }
        return res.status(401).send({
        status: 401,
        message: err.message
        })
    }
};