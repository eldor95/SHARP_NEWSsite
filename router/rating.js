const express = require('express')
const router = express.Router()
const rating = require('../controller/rating')

router.post('/create', rating.createOne)
router.get('/getAll', rating.getAll)
router.delete('/:id', rating.deleteOne)

module.exports = router