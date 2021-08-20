const express = require('express')
const router = express.Router()
const admin = require('../controller/admin_Router')
const { isAuth } = require('../middleware/isAuth')




router.get('/dashboard', admin.dashboard)
router.get('/users', admin.users)
router.get('/login', admin.login)
router.get('/login_client', admin.login_client)
router.get('/register_client', admin.register_client)
    //isAuth,
module.exports = router