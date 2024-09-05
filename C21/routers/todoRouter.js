var express = require('express');
var router = express.Router();
const { getTodo, getAddTodo, createTodo, removeTodo, getEdit, updateTodo } = require('../controllers/todoController')
const { isLoggedIn } = require('../helpers/util')

router.get('/', isLoggedIn, getTodo)
router.get('/add', isLoggedIn, getAddTodo)
router.post('/add', isLoggedIn, createTodo)
router.get('/delete/:id', isLoggedIn, removeTodo)
router.get('/edit/:id', isLoggedIn, getEdit)
router.post('/edit/:id', isLoggedIn, updateTodo)

module.exports = router;
