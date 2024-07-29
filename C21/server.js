const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { getTodo, getAddTodo, createTodo, removeTodo, getEdit, updateTodo } = require('./controllers/todoController')
const { signInGet, registerGet, signIn, register, getAva, updateAva, logout } = require('./controllers/userController')
var session = require('express-session');
const { isLoggedIn } = require('./helpers/util')
var flash = require('connect-flash');
const fileUpload = require('express-fileupload');


app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'mnhc21',
    resave: false,
    saveUninitialized: true
  }))
app.use(flash())
app.use(fileUpload());

app.get('/', signInGet)

app.post('/login', signIn)

app.get('/register', registerGet)

app.post('/register', register)

app.get('/todo/', isLoggedIn, getTodo)

app.get('/todo/add', isLoggedIn, getAddTodo)

app.post('/todo/add', isLoggedIn, createTodo)

app.get('/todo/delete/:id', isLoggedIn, removeTodo)

app.get('/todo/edit/:id', isLoggedIn, getEdit)

app.post('/todo/edit/:id', isLoggedIn, updateTodo)

app.get('/users/avatar', isLoggedIn, getAva)

app.post('/users/avatar', isLoggedIn, updateAva)

app.get('/logout', logout)

app.listen(3000, function () {
    console.log('server berjalan di port 3000')
})



