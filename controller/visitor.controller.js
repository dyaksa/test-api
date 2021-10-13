exports.create = async (req,res,next) => {
    try {
        if(req.files !== undefined){
            const images = await Promise.all(req.files.images.map(async (image) => {
                return {
                    name: image.originalname,
                    path: image.path
                }
            }));
        }
        return res.status(201).send({
            status: 200,
            message: 'success'
        })
    }catch(err){
        return next(err);
    }
}

exports.get = async (req,res,next) => {
    try {

    }catch(err){
        return next(err);
    }
}

exports.detail = async (req,res,next) => {
    try {

    }catch(err){
        return next(err);
    }
}

exports.update = async (req,res,next) => {
    try {

    }catch(err){
        return next(err);
    }
}

exports.delete = async (req,res,next) => {
    try {

    }catch(err){
        return next(err);
    }
}