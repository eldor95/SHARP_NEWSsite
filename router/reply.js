const express = require('express')
const router = express.Router()
const reply = require('../controller/reply')


router.post('/create', reply.createOne)
router.get('/getAll', reply.getAll)
router.get('/:id', reply.filterAll)
router.delete('/:id', reply.deleteOne)

module.exports = router