const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { getPerson, getAddPerson, createPerson, removePerson, getEdit, updatePerson } = require('./controllers/personController')
const { db } = require('./models/connect')

app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', getPerson)

app.get('/add', getAddPerson)

app.post('/add', createPerson)

app.get('/delete/:id', removePerson)

app.get('/edit/:id', getEdit)

app.post('/edit/:id', updatePerson)

app.listen(3000, function () {
    console.log('server berjalan di port 3000')
})



