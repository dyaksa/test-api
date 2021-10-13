const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req, file,cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}.${file.originalname.split('.').pop()}`
        )
    }
});

exports.uploadImage = (req,res,next) => {
    try{
        const upload = multer({
            storage
        }).fields([{name: 'images', maxCount: 1}]);
        upload(req,res,(err) => {
            if (err instanceof multer.MulterError) {
            return res.status(500).send({
                status: 500,
                error: err.message,
                });
            }
        
            if (err) {
            return res.status(500).send({
                status: 500,
                error: err.message,
            });
            }
            next();
        })
    }catch(err){
        throw new Error(err);
    }
}