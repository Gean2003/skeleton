const router = require('express').Router();

const { registerUser } = require('../controllers/user.controller') ;
const authController = require('../controllers/auth.controller')


router.post('/register', registerUser)
router.post('/login', authController.login)

module.exports = router
