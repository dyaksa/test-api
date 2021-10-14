const User = require('../schema/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.login = async (req,res,next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });
        return res.status(201).send({
            status: 201,
            message: 'authentication successfull',
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                email: user.email
            }
        })
    }catch(err){
        return next(err);
    }
}

exports.register = async (req,res,next) => {
    try {
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512',salt).update(req.body.password).digest('base64');
        req.body.password = salt + '$' + hash;
        const createNewUser = await User.create(req.body);
        return res.status(201).send({
            status: 201,
            message: 'success create',
            data: createNewUser
        })
    }catch(err){
        return next(err);
    }
}

exports.refreshToken = async (req,res,next) => {
    try {
        const decodedToken = jwt.verify(req.body.refresh_token, process.env.JWT_REFRESH_SECRET);
        const userData = {
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email
        };
        const accessToken = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign(userData, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });
        return res.status(201).send({
            status: 201,
            message: 'success reresh token',
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                email: decodedToken.email
            }
        })
    }catch(err){
        return next(err);
    }
}