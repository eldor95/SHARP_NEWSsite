const express = require('express')
const router = express.Router()
const category = require('../controller/category')
const { roles } = require('../middleware/isAuth')


router.post('/create', category.createOne)
router.get('/getAll', category.getAll)
router.get('/:id', category.getOne)
router.put('/:id', category.updateOne)
router.delete('/:id', category.deleteOne)
    //roles('admin', 'atr')
module.exports = router