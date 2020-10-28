const multer = require("multer");
const uuid = require("uuid")

module.exports = function upload(path, format){
    const storage = multer.diskStorage({
        destination(req, file, cb){
            cb(null, "./upload" + path);
        },
        filename(req, file = {}, cb){

            const { originalname } = file;
            const originalnameSplit = file.split(".");
            const fileExt = originalnameSplit[1];

            cb(null, uuid.v4() + "." + fileExt);
        }
    })
    return multer({
        storage,
        fileFilter(req, file, cb){
            const files = file.mimetype.startsWith(format);
            if(files){
                next(null, true);
            } else {
                next({error: "Su archivo no es válido"}, false)
            }
        }
    })
}