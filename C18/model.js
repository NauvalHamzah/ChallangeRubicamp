const sqlite3 = require('sqlite3').verbose();

class Model {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath);
    }

    checkUserName(userName, callback) {
        this.db.all('SELECT * FROM User', [], (err, rows) => {
            if (err) {
                callback(err, null)
            } else {
                const userExist = rows.some(row => row.user_name === userName)
                callback(null, userExist)
            }
        });
    }

    checkPassword(userName, password, callback) {
        this.db.all('SELECT * FROM User', [], (err, rows) => {
            if (err) {
                callback(err, null)
            } else {
                const idx = rows.findIndex(obj => obj.user_name === userName);
                callback(null, rows[idx])
            }
        });
    }

    daftar(menu, callback) {
        switch (menu) {
            case 'Mahasiswa':
                const sqlMhs = `SELECT m.nim, m.nama_lengkap, m.dob, m.alamat, m.kode_jurusan, j.nama_jurusan 
                FROM Mahasiswa as m
                JOIN Jurusan as j on m.kode_jurusan = j.kode_jurusan`;
                this.db.all(sqlMhs, [], (err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
            case 'Jurusan':
                const sqlJrs = `SELECT * FROM Jurusan`;
                this.db.all(sqlJrs, [], (err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
            case 'Dosen':
                const sqlDsn = `SELECT d.nip, d.nama_lengkap, j.nama_jurusan 
                FROM Dosen as d
                JOIN Jurusan as j on d.kode_jurusan = j.kode_jurusan`;
                this.db.all(sqlDsn, [], (err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
            case 'Mata Kuliah':
                const sqlMK = `SELECT kode_mata_kuliah, nama_mata_kuliah, jumlah_sks FROM MataKuliah`;
                this.db.all(sqlMK, [], (err, rows) => {
                    if (err) {
                        console.log(err)
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
            case 'Kontrak':
                const sqlK = `SELECT k.id, k.nim, m.nama_lengkap as nama_mhs, mk.nama_mata_kuliah, d.nama_lengkap as nama_dosen, k.nilai
                FROM Kontrak as k
                JOIN Mahasiswa as m on k.nim = m.nim
                JOIN MataKuliah as mk on k.kode_mata_kuliah = mk.kode_mata_kuliah
                JOIN Dosen as d on k.nip = d.nip`;
                this.db.all(sqlK, [], (err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
        }
    }

    cari(menu, input, callback) {
        switch (menu) {
            case 'Mahasiswa':
                const sqlMhs = `SELECT * FROM Mahasiswa WHERE nim=${input}`;
                this.db.all(sqlMhs, [], (err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
            case 'Jurusan':
                const sqlJrs = `SELECT * FROM Jurusan WHERE kode_jurusan=${input}`;
                this.db.all(sqlJrs, [], (err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
            case 'Dosen':
                const sqlDsn = `SELECT * FROM Dosen WHERE nip=${input}`;
                this.db.all(sqlDsn, [], (err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
            case 'Mata Kuliah':
                const sqlMK = `SELECT * FROM MataKuliah WHERE kode_mata_kuliah='${input}'`;
                this.db.all(sqlMK, [], (err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
            case 'Kontrak':
                const sqlK = `SELECT id, nim, kode_mata_kuliah, nip , nilai 
                FROM Kontrak
                WHERE nim=${input}`;
                this.db.all(sqlK, [], (err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
            case 'UpdateNilai':
                const sqlUpdateNilai = `SELECT k.id, mk.nama_mata_kuliah, k.nilai
                FROM Kontrak as K
                JOIN MataKuliah as mk on k.kode_mata_kuliah = mk.kode_mata_kuliah
                WHERE nim=${input}`;
                this.db.all(sqlUpdateNilai,[],(err, rows) => {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        callback(null, rows); // Pass rows to the callback
                    }
                });
                break;
        }
    }

    tambah(menu, addData, callback) {
        switch (menu) {
            case 'Mahasiswa':
                this.cari('Jurusan', addData.kode_jurusan, (err, rows) => {
                    if (!rows || err || Object.keys(rows).length === 0) {
                        err = "Data gagal ditambahkan"
                        callback(err, null)
                    }
                    else {
                        const sqlMhs = `INSERT INTO Mahasiswa (nim, nama_lengkap, dob, alamat, kode_jurusan) VALUES (?, ?, ?, ?,?)`;
                        this.db.run(sqlMhs, [addData.nim, addData.nama, addData.bod, addData.alamat, addData.kode_jurusan], function (err, status) {
                            if (err) {
                                callback(err, null); // Pass error to the callback
                            } else {
                                status = this.changes;
                                callback(null, status); // Pass rows to the callback
                            }
                        });
                    }
                })
                break;
            case 'Jurusan':
                const sqlJrs = `INSERT INTO Jurusan (kode_jurusan, nama_jurusan) VALUES (?,?)`;
                this.db.run(sqlJrs, [addData.kode, addData.nama], function (err, status) {
                    if (err) { callback(err, null) }
                    else { callback(null, status) }
                })
                break;
            case 'Dosen':
                this.cari('Jurusan', addData.kode_jurusan, (err, rows) => {
                    if (!rows || err || Object.keys(rows).length === 0) {
                        err = "Data gagal ditambahkan"
                        callback(err, null)
                    }
                    else {
                        const sqlDsn = `INSERT INTO Dosen (nip, nama_lengkap, kode_jurusan) VALUES (?, ?, ?)`;
                        this.db.run(sqlDsn, [addData.nip, addData.nama, addData.kode_jurusan], function (err, status) {
                            if (err) {
                                callback(err, null); // Pass error to the callback
                            } else {
                                status = this.changes;
                                callback(null, status); // Pass rows to the callback
                            }
                        });
                    }
                })
                break;
            case 'Mata Kuliah':
                this.cari('Jurusan', addData.kode_jurusan, (err, rows) => {
                    if (!rows || err || Object.keys(rows).length === 0) {
                        err = "Data gagal ditambahkan"
                        callback(err, null)
                    }
                    else {
                        const sqlMK = `INSERT INTO MataKuliah (kode_mata_kuliah, nama_mata_kuliah, jumlah_sks, kode_jurusan) VALUES (?, ?, ?, ?)`;
                        this.db.run(sqlMK, [addData.kode, addData.nama, addData.sks, addData.kode_jurusan], function (err, status) {
                            if (err) {
                                callback(err, null); // Pass error to the callback
                            } else {
                                status = this.changes;
                                callback(null, status); // Pass rows to the callback
                            }
                        });
                    }
                })
                break;
            case 'Kontrak':
                this.cari('Mahasiswa', addData.nim,(err,rows)=>{
                    if(!rows || err || Object.keys(rows).length === 0) {
                        err = "Data gagal ditambahkan"
                        callback(err, null)
                    } else{
                this.cari('Mata Kuliah', addData.kMK, (err, rows) => {
                    if (!rows || err || Object.keys(rows).length === 0) {
                        err = "Data gagal ditambahkan"
                        callback(err, null)
                    }
                    else {
                        this.cari('Dosen', addData.kDsn, (err, rows) => {
                            if (!rows || err || Object.keys(rows).length === 0) {
                                err = "Data gagal ditambahkan"
                                callback(err, null)
                            }
                            else {
                                const sqlK = `INSERT INTO Kontrak (nim, kode_mata_kuliah, nip) VALUES (?, ?, ?)`;
                                this.db.run(sqlK, [addData.nim, addData.kMK, addData.kDsn], function (err, status) {
                                    if (err) {
                                        callback(err, null); // Pass error to the callback
                                    } else {
                                        status = this.changes;
                                        callback(null, status); // Pass rows to the callback
                                    }
                                });
                            }
                        })
                    }
                })
            }
            })
                break;
        }

    }

    hapus(menu, input, callback) {
        switch (menu) {
            case 'Mahasiswa':
                const sqlMhs = `DELETE FROM Mahasiswa WHERE nim=${input}`;
                this.db.run(sqlMhs, [], function (err, status) {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        status = this.changes;
                        callback(null, status); // Pass rows to the callback
                    }
                });
                break;
            case 'Jurusan':
                const sqlJrs = `DELETE FROM Jurusan WHERE kode_jurusan=${input}`;
                this.db.run(sqlJrs, [], function (err, status) {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        status = this.changes;
                        callback(null, status); // Pass rows to the callback
                    }
                });
                break;
            case 'Dosen':
                const sqlDsn = `DELETE FROM Dosen WHERE nip=${input}`;
                this.db.run(sqlDsn, [], function (err, status) {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        status = this.changes;
                        callback(null, status); // Pass rows to the callback
                    }
                });
                break;
            case 'Mata Kuliah':
                const sqlMK = `DELETE FROM MataKuliah WHERE kode_mata_kuliah='${input}'`;
                this.db.run(sqlMK, [], function (err, status) {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        status = this.changes;
                        callback(null, status); // Pass rows to the callback
                    }
                });
                break;
            case 'Kontrak':
                const sqlK = `DELETE FROM Kontrak WHERE ID=${input}`;
                this.db.run(sqlK, [], function (err, status) {
                    if (err) {
                        callback(err, null); // Pass error to the callback
                    } else {
                        status = this.changes;
                        callback(null, status); // Pass rows to the callback
                    }
                });
                break;
        }

    }

    updateNilai(newValue,callback){
        const sqlUpdateNilai = `UPDATE Kontrak SET nilai='${newValue.nilai}' WHERE id=${newValue.id} AND nim=${newValue.nim}`;
        this.db.run(sqlUpdateNilai,[],function(err,status){
            if (err) {
                callback(err, null); // Pass error to the callback
            } else {
                status = this.changes;
                callback(null, status); // Pass rows to the callback
            }           
        })
    }

}

module.exports = Model;