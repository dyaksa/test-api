const { validationResult, body } = require('express-validator');
const crypto = require('crypto');
const User = require('../schema/user.model');

exports.login = () => {
    return [
        body('password').exists().notEmpty(),
        body('email').exists().notEmpty().custom(async (email, {req}) => {
            const user = await User.findOne({email: email});
            if(!user) return Promise.reject('user not found');
            const passwordFields = user.password.split('$');
            const salt = passwordFields[0];
            const hash = crypto.createHmac('sha512', salt)
            .update(req.body.password)
            .digest('base64')
            if(hash !== passwordFields[1]) return Promise.reject('password does not match');
            return true;
        }),
    ]
}

exports.register = () => {
    return [
        body('email').exists().notEmpty().custom(async (email, {req}) => {
            const user = await User.findOne({email: email});
            if(user) return Promise.reject('email has been registered');
            return true
        }),
        body('username').exists().notEmpty().custom(async (username, {req}) => {
            const user = await User.findOne({username: username });
            if(user) return Promise.reject('username has been registered');
            return true;
        }),
        body('password').notEmpty().exists()
    ]
}

exports.visitor = () => {
    return [
        body('name').exists().notEmpty(),
        body('ktp_id').exists().notEmpty(),
        body('age').exists().notEmpty(),
        body('phone').exists().notEmpty(),
        body('date_of_birth').exists().notEmpty(),
        body('status').exists().notEmpty()
    ]
}

exports.validate = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) return next();

    const extractedErors = [];
    errors.array().map((err) => extractedErors.push({[err.param]: err.msg}));
    return res.status(401).send({
        status: 401,
        message: 'invalid',
        error: extractedErors
    })
}