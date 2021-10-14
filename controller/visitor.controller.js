const Visitor = require('../schema/visitor.model');

exports.create = async (req,res,next) => {
    try {
        if(req.files.images !== undefined){
            const images = await Promise.all(req.files.images.map(async (image) => {
                return {
                    name: image.originalname,
                    path: image.path
                }
            }));
        }
        const createdVisitor = await Visitor.create(req.body);
        return res.status(201).send({
            status: 201,
            message: 'success create visitor',
            data: createdVisitor
        })
    }catch(err){
        return next(err);
    }
}

exports.get = async (req,res,next) => {
    try {
        const visitors = await Visitor.find();
        return res.status(200).send({
            status: 200,
            message: 'success',
            data: visitors
        })
    }catch(err){
        return next(err);
    }
}

exports.detail = async (req,res,next) => {
    try {   
        const detailVisitor = await Visitor.findOne({_id: req.params.id});
        return res.status(200).send({
            status: 200,
            message: 'success',
            date: detailVisitor
        })
    }catch(err){
        return next(err);
    }
}

exports.update = async (req,res,next) => {
    try {
        const updatedData = await Visitor.findOneAndUpdate({_id: req.params.id},req.body);
        return res.status(200).send({
            status: 200,
            message: 'success updated',
            data: {...updatedData._doc, ...req.body}
        })
    }catch(err){
        return next(err);
    }
}

exports.delete = async (req,res,next) => {
    try {
        await Visitor.deleteOne({_id: req.params.id});
        return res.status(200).send({
            status: 200,
            message: `${req.params.id} success deleted`
        })
    }catch(err){
        return next(err);
    }
}