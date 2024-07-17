const multer = require('multer');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const upload = multer({ dest: './public/data/uploads' });

module.exports = { upload };
