const User = require('../schema/user.model');
const crypto = require('crypto');

exports.login = async (req,res,next) => {
    try {

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