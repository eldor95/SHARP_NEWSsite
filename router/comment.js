const express = require('express')
const router = express.Router()
const comment = require('../controller/comment')



router.post('/create', comment.createOne)
router.get('/getAll', comment.getAll)
router.put('/:id', comment.updateOne)
router.delete('/:id', comment.deleteOne)


module.exports = router