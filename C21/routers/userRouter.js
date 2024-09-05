var express = require('express');
var router = express.Router();
const { getAva, updateAva } = require('../controllers/userController')
const { isLoggedIn } = require('../helpers/util')


router.get('/avatar', isLoggedIn, getAva)
router.post('/avatar', isLoggedIn, updateAva)

module.exports = router;
