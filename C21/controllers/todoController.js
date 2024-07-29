const Todo = require('../models/TodoModel')
const moment = require('moment')

function getTodo(req, res) {
    const page = req.query.page || 1
    const url = req.url === '/todo' ? 'todo/?page=1&sortBy=id&sortMode=asc' : req.url
    const keys = {}

    // sorting
    const sortBy = req.query.sortBy || 'id'
    const sortMode = req.query.sortMode || 'asc'

    //searching
    keys.title = req.query.title
    keys.complete = req.query.complete
    keys.startDate = req.query.startDate
    keys.endDate = req.query.endDate
    keys.operation = req.query.operation || 'OR'
    Todo.getUser(req.session.user.email, function(item){
        const avaName = item[0].avatar || '/images/def_ava.jpg'
        Todo.all(page, keys, sortBy,sortMode,req.session.user.id, function ({ data, maxPage, offset }) {
            res.render('todos/todo', { data, page, maxPage, offset, url, query: keys, sortBy, sortMode, moment, user: req.session.user, avaName })
        })
    })
}

function getAddTodo(req, res) {
    const heading = "Adding Data"
    res.render('todos/form', { item: {}, heading })
}

function createTodo(req, res) {
    const title = req.body.title
    const deadline = Date.now()
    const complete = false
    const user = req.session.user.id
    Todo.create(title, deadline, complete, user, function () {
        res.redirect('/todo')
    })
}

function removeTodo(req, res) {
    const index = req.params.id
    Todo.remove(index, function () {
        res.redirect('/todo')
    })
}

function getEdit(req, res) {
    const index = req.params.id
    const heading = "Update Data"
    Todo.get(index, function (item) {
        res.render('todos/form', { item, heading })
    })
}

function updateTodo(req, res) {
    const index = req.params.id
    const title = req.body.title
    const deadline = req.body.deadline
    const complete = req.body.complete || false
    Todo.update(title, deadline, complete, index, function () {
        res.redirect('/todo')
    })
}

module.exports = { getTodo, getAddTodo, createTodo, removeTodo, getEdit, updateTodo }