const { db } = require('./pg')

class User {

    constructor({ id, email, password, avatar }) {
        this.id = id || null
        this.email = email
        this.password = password
        this.avatar = avatar || null
    }

    static checkUser(email,callback){
        db.query('SELECT 1 FROM users WHERE email = $1 LIMIT 1', [email], function (err, data) {
            if (err) { console.log(err) }
            else {callback(data.rows)}
        })
    }

    static getUser(email,callback){
        db.query('SELECT * FROM users WHERE email = $1', [email], function (err, data) {
            if (err) { console.log(err) }
            else {callback(data.rows)}
        })
    }

    static createUser(email,password,callback){
        db.query('INSERT INTO users (email,  password) VALUES ($1,$2)',
            [email,  password], function (err) {
                if (err) return console.log(err)
                callback()
            })
    }

    static updateAvatar(id,avaName,callback){
        avaName='/images/'+avaName
        db.query('UPDATE users SET avatar=$1 WHERE id=$2',
            [ avaName, id], function (err) {
                if (err) return console.log(err)
                callback()
            })
    }

}

module.exports = User