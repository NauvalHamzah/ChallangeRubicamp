const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
var session = require('express-session');
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

var indexRouter = require('./routers/indexRouter');
var userRouter = require('./routers/userRouter');
var todoRouter = require('./routers/todoRouter');

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/todo', todoRouter)

app.listen(3000, function () {
    console.log('server berjalan di port 3000')
})



