var express = require('express');
var router = express.Router();
const { signInGet, registerGet, signIn, register, logout } = require('../controllers/indexController')

router.get('/', signInGet)
router.post('/login', signIn)
router.get('/register', registerGet)
router.post('/register', register)
router.get('/logout', logout)

module.exports = router;
