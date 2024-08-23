const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path')

function signInGet(req, res) {
    res.render('signIn', {
        failedMessage: req.flash('failedMessage'),
        successMessage: req.flash('successMessage')
    })
}

function registerGet(req, res) {
    res.render('register', {
        failedMessage: req.flash('failedMessage'),
        successMessage: req.flash('successMessage')
    })
}

function signIn(req, res) {
    const { email, password } = req.body
    User.checkUser(email, function (exist) {
        if (!exist[0]) {
            req.flash('failedMessage', `User with email ${email} is not registered. Please sign up!`)
            res.redirect('/')
        } else {
            User.getUser(email, function (user) {
                if (bcrypt.compareSync(password, user[0].password)) {
                    req.session.user = { id: user[0].id, email: user[0].email, avatar: user[0].avatar || '/images/def_ava.jpg' }
                    res.redirect('/todo')
                } else {
                    req.flash('failedMessage', 'password is wrong')
                    res.redirect('/')
                }
            })
        }
    })
}

function register(req, res) {
    const { email, password, retypePassword } = req.body
    if (password !== retypePassword) {
        req.flash('failedMessage', 'password is different')
        res.redirect('/register')
    } else {
        User.checkUser(email, function (exist) {
            if (exist[0]) {
                req.flash('failedMessage', `user with email ${email} already registered`)
                res.redirect('/register')
            } else {
                const hash = bcrypt.hashSync(password, saltRounds)
                User.createUser(email, hash, function () {
                    req.flash('successMessage', 'succesfully registered, please sign in!')
                    res.redirect('/')
                })
            }
        })
    }
}

function getAva(req, res) {
        res.render('avatar')   
}

function updateAva(req, res) {
    const id=req.session.user.id
    if (!req.files || Object.keys(req.files).length === 0) {
        res.redirect('/todo')
    }

    let avatar = req.files.avatar;
    const avaName = `${Date.now()}-${avatar.name}`
    const uploadPath = path.join(__dirname,'..','public','images',avaName)
    avatar.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        User.updateAvatar(id, avaName, function () {
            res.redirect('/todo')
        });
    });
}

function logout(req, res) {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
}

module.exports = { signInGet, registerGet, signIn, register, getAva, updateAva, logout }