const express = require('express')
const router = express.Router()
const controller = require('../controller/user')



router.post('/create', controller.create)
router.post('/login', controller.login) //     /admin login
router.post('/login_website', controller.login_website) //  login user
router.get('/logout', controller.logout) //     /logout
router.get('/logout_client', controller.logout_client) //     /logout
router.get('/getAll', controller.getAll)
router.get('/:id', controller.getOne)
router.put('/:id', controller.updateOne)
router.delete('/:id', controller.Delete)

module.exports = router