const { db } = require('./pg')
const moment = require('moment')

class Todo {
    constructor({ id, title, complete, deadline, user_id }) {
        this.id = id || null
        this.title = title
        this.complete = complete || false
        this.deadline = deadline
        this.user_id = user_id
    }

    static all(page, keys, sortBy, sortMode, id, callback) {
        const params = []
        const sqlparams = []

        if(id){
            params.push(id)
            sqlparams.push(`userid = $${params.length}`)
        }

        if (keys.title) {
            params.push(keys.title)
            sqlparams.push(`title ilike '%' || $${params.length} || '%'`)
        }

        if (keys.complete) {
            if(keys.complete=='true'){
                keys.complete=1
            } else {keys.complete=0}
            params.push(keys.complete)
            sqlparams.push(`complete = $${params.length}`)
        }

        db.query("SELECT MIN(deadline) AS earliest_date, MAX(deadline) AS latest_date FROM todos", function (err, data) {
            const earliest_date = data.rows[0].earliest_date
            const latest_date = data.rows[0].latest_date
            if(keys.startDate && keys.endDate){
                params.push(keys.startDate)
                params.push(keys.endDate)
                sqlparams.push(`(deadline BETWEEN $${params.length-1} AND $${params.length})`)
            } else if(!keys.startDate && keys.endDate){
                params.push(earliest_date)
                params.push(keys.endDate)
                sqlparams.push(`(deadline BETWEEN $${params.length-1} AND $${params.length})`)
            } else if(keys.startDate && !keys.endDate){
                params.push(keys.startDate)
                params.push(latest_date)
                sqlparams.push(`(deadline BETWEEN $${params.length-1} AND $${params.length})`)
            }
            const limit = 5;
            const offset = (page - 1) * limit;
            let sql = 'SELECT count(*) as total FROM todos'
            if (sqlparams.length > 0) {
                sql += ` WHERE ${sqlparams.join(` ${keys.operation} `)}`
            }
            db.query(sql,params, function (err, count) {
                const total = count.rows[0].total
                const maxPage = Math.ceil(total / limit)
                sql = 'SELECT * FROM todos'
                if (sqlparams.length > 0) {
                    sql += ` WHERE ${sqlparams.join(` ${keys.operation} `)}`
                }
                if(sortBy=='complete' && sortMode=='asc'){ sortMode='desc' }
                else if(sortBy=='complete' && sortMode=='desc'){ sortMode='asc' }
                sql += ` ORDER BY ${['id', 'title', 'complete','deadline'].includes(sortBy) ? sortBy : 'id'} ${sortMode == 'asc' ? 'asc' : 'desc'}`
                params.push(limit, offset)
                sql += ` LIMIT $${params.length-1} OFFSET $${params.length}`
                db.query(sql, params, function (err, data) {
                    if (err) { console.log(err) }
                    else { callback({ data: data.rows, maxPage, offset }) 
                    }
                })
            })
        })
    }

    static get(index, callback) {
        db.query('SELECT * FROM todos WHERE id=$1', [index], function (err, data) {
            if (err) { console.log(err) }
            else { data.rows[0].deadline=moment(data.rows[0].deadline).format('YYYY-MM-DDTHH:mm')
                callback(data.rows[0]) 
            }
        })
    }

    static remove(index, callback) {
        db.query('DELETE FROM todos WHERE id=$1', [index], function (err) {
            if (err) return console.log(err)
            callback()
        })
    }

    static create(title,  deadline, complete, user, callback) {
        deadline = moment(deadline).add(1,'day').format('DD MMM YYYY HH:mm')
        db.query('INSERT INTO todos (title,  deadline, complete, userid) VALUES ($1,$2,$3,$4)',
            [title,  deadline, complete, user], function (err) {
                if (err) return console.log(err)
                callback()
            })
    }

    static update(title, deadline, complete, index, callback) {
        db.query('UPDATE todos SET title=$1,deadline=$2,complete=$3 WHERE id=$4',
            [title,  deadline, complete, index], function (err) {
                if (err) return console.log(err)
                callback()
            })
    }

    static getUser(email,callback){
        db.query('SELECT * FROM users WHERE email = $1', [email], function (err, data) {
            if (err) { console.log(err) }
            else {callback(data.rows)}
        })
    }
}

module.exports = Todo