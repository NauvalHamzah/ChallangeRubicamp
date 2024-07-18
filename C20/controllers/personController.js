const Person = require('../models/person')

function getPerson(req, res) {
    const page = req.query.page || 1
    const url = req.url === '/' ? '/?page=1' : req.url
    const keys={}
    keys.name = req.query.name
    keys.height = req.query.height
    keys.weight = req.query.weight
    keys.startDate = req.query.startDate
    keys.endDate = req.query.endDate
    keys.married = req.query.married
    keys.operation = req.query.operation || 'OR'
    Person.all(page, keys, function ({data, maxPage, offset}) {
        res.render('person', { data, page, maxPage, offset, url, query: keys })
    })
}

function getAddPerson(req, res) {
    const heading = "Adding Data"
    res.render('form', { item: {}, heading })
}

function createPerson(req, res) {
    if (Object.keys(req.body).length !== 0) {
        const name = req.body.name
        const height = req.body.height
        const weight = req.body.weight
        const birthdate = req.body.birthdate
        const married = JSON.parse(req.body.married)
        Person.create(name, height, weight, birthdate, married, function () {
            res.redirect('/')
        })
    } else { res.redirect('/') }
}

function removePerson(req, res) {
    const index = req.params.id
    Person.remove(index, function () {
        res.redirect('/')
    })
}

function getEdit(req, res) {
    const index = req.params.id
    const heading = "Update Data"
    Person.get(index, function (item) {
        res.render('form', { item, heading })
    })
}

function updatePerson(req, res) {
    if (Object.keys(req.body).length !== 0) {
        const index = req.params.id
        const name = req.body.name
        const height = req.body.height
        const weight = req.body.weight
        const birthdate = req.body.birthdate
        const married = JSON.parse(req.body.married)
        Person.update(name, height, weight, birthdate, married, index, function () {
            res.redirect('/')
        })
    } else { res.redirect('/') }
}


module.exports = { getPerson, getAddPerson, createPerson, removePerson, getEdit, updatePerson }