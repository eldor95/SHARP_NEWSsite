const express = require('express')
const router = express.Router()
const client = require('../controller/client_Router')





router.get('/', client.dashboard)
router.get('/category_news/:id', client.getOne_category_news)
router.get('/get_news/:id', client.get_one_news)




module.exports = router