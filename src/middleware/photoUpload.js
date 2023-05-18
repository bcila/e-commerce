const multer = require('multer');

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/public/uploads');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-'  + Math.round(Math.random() * 1e9);
        const ext = file.mimetype.split('/')[1];
        callback(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    },
});

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Only Image is Allowed...'))
    }
}

const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
});

const uploadImage = upload.single('product');

module.exports = {
    uploadImage,
};
