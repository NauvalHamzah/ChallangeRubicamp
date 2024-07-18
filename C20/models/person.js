const { db } = require('./connect')

class Person {

    constructor({ id, name, height, weight, birthdate, married }) {
        this.id = id || null
        this.name = name
        this.height = height
        this.weight = weight
        this.birthdate = birthdate
        this.married = married || false
    }

    static all(page, keys, callback) {
        const params = []
        const sqlparams = []
        if (keys.name) {
            params.push(keys.name)
            sqlparams.push(`name like '%' || ? || '%'`)
        }
        if (keys.height) {
            params.push(keys.height)
            sqlparams.push(`height = ?`)
        }
        if (keys.weight) {
            params.push(keys.weight)
            sqlparams.push(`weight = ?`)
        }

        if (keys.married) {
            if(keys.married=='true'){
                keys.married=1
            } else {keys.married=0}
            params.push(keys.married)
            sqlparams.push(`married = ?`)
        }

        db.get("SELECT MIN(birthdate) AS earliest_date, MAX(birthdate) AS latest_date FROM data", function (err, date) {
            const earliest_date = date.earliest_date
            const latest_date = date.latest_date
            if(keys.startDate && keys.endDate){
                params.push(keys.startDate)
                params.push(keys.endDate)
                sqlparams.push(`(birthdate BETWEEN ? AND ?)`)
            } else if(!keys.startDate && keys.endDate){
                params.push(earliest_date)
                params.push(keys.endDate)
                sqlparams.push(`(birthdate BETWEEN ? AND ?)`)
            } else if(keys.startDate && !keys.endDate){
                params.push(keys.startDate)
                params.push(latest_date)
                sqlparams.push(`(birthdate BETWEEN ? AND ?)`)
            }
            const limit = 5;
            const offset = (page - 1) * limit;
            let sql = 'SELECT count(*) as total FROM data'
            if (sqlparams.length > 0) {
                sql += ` WHERE ${sqlparams.join(` ${keys.operation} `)}`
            }
            db.get(sql,params, function (err, count) {
                const total = count.total
                const maxPage = Math.ceil(total / limit)
                sql = 'SELECT * FROM data'
                if (sqlparams.length > 0) {
                    sql += ` WHERE ${sqlparams.join(` ${keys.operation} `)}`
                }
                sql += ' limit ? offset ?'
                params.push(limit, offset)
                db.all(sql, params, function (err, rows) {
                    if (err) { console.log(err) }
                    else { callback({ data: rows, maxPage, offset }) }
                })
            })
        })
    }

    static get(index, callback) {
        db.all('SELECT * FROM data WHERE id=?', [index], function (err, row) {
            if (err) { console.log(err) }
            else { callback(row[0]) }
        })
    }

    static remove(index, callback) {
        db.run('DELETE FROM data WHERE id=?', [index], function (err) {
            if (err) return console.log(err)
            callback()
        })
    }

    static create(name, height, weight, birthdate, married, callback) {
        db.run('INSERT INTO data (name,height,weight,birthdate,married) VALUES (?,?,?,?,?)',
            [name, height, weight, birthdate, married], function (err) {
                if (err) return console.log(err)
                callback()
            })
    }

    static update(personName, height, weight, birthdate, married, index, callback) {
        db.run('UPDATE data SET name=?,height=?,weight=?,birthdate=?,married=? WHERE id=?',
            [personName, height, weight, birthdate, married, index], function (err) {
                if (err) return console.log(err)
                callback()
            })
    }

}

module.exports = Person