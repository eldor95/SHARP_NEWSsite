const express = require('express')
const router = express.Router()
const multer = require('multer')
const md5 = require('md5')
const path = require('path')
const news = require('../controller/news')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/convert');
    },

    filename: function(req, file, cb) {
        cb(null, `${md5 (Date.now ())}${path.extname (file.originalname)}`);
    },
});
const upload = multer({ storage: storage });


router.post('/create', upload.single('image'), news.createOne)
router.get('/getAll', news.getAll)
router.put('/:id', news.updateOne)
router.put('/image/:id', upload.single('image'), news.updateImage)
router.delete('/:id', news.deleteOne)
router.get('/:id', news.getOne)

module.exports = router