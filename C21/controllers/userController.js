const User = require('../models/UserModel')
const Todo = require('../models/TodoModel')
const path = require('path')

function getAva(req, res) {
    Todo.getUser(req.session.user.email, function(item){
    const avaName = item[0].avatar || '/images/def_ava.jpg'
    res.render('users/avatar',{avaName})   
    })
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

module.exports = { getAva, updateAva }