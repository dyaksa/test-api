exports.filterUpload = (req,file,cb) => {
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
        req.fileValidationError = "Only video file are allowed";
        return cb(new Error("only video file are allowed"), false);
    }
    cb(null,true);
}
