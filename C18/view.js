const readline = require('readline');
const Table = require('cli-table3');

class View {
  welcomeMessage() {
    console.log(`
====================================================================================================
Welcome to Institut Teknologi Bandung
Jl. Ganesa No.10
====================================================================================================
      `);
  }

  promptUserName(rl, callback) {
    rl.question('username: ', (username) => {
      callback(username);
    });
  }

  promptPassword(rl, callback) {
    rl.question('password: ', (password) => {
      callback(password)
    })
  }

  loginSuccess(user) {
    console.log(`
====================================================================================================
welcome, ${user.user_name}. Your access level is : ${user.role}
      `);
  }

  mainMenu(rl, callback) {
    rl.question(`
====================================================================================================

silahkan pilih opsi di bawah ini:
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar

====================================================================================================
Masukan salah satu nomor dari opsi di atas: `, (menu) => {
      callback(menu);
    })
  }

  menuPilihan(rl, menu, callback) {
    if (menu === "Kontrak") {
      rl.question(`
====================================================================================================

silahkan pilih opsi di bawah ini:
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Update Nilai
[6] Kembali
  
====================================================================================================
Masukan salah satu nomor dari opsi di atas: `, (subMenu) => {
        callback(subMenu);
      })
    } else {
      rl.question(`
====================================================================================================      

silahkan pilih opsi di bawah ini:
[1] Daftar ${menu}
[2] Cari ${menu}
[3] Tambah ${menu}
[4] Hapus ${menu}
[5] Kembali

====================================================================================================
Masukan salah satu nomor dari opsi di atas: `, (subMenu) => {
        callback(subMenu);
      })
    }
  }

  daftar(menu, rows) {
    switch (menu) {
      case 'Mahasiswa':
        const headersMhs = ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
        const tableMhs = new Table({ head: headersMhs });
        rows.forEach((row) => {
          tableMhs.push(Object.values(row));
        });
        console.log(tableMhs.toString());
        break;
      case 'Jurusan':
        const headersJrs = ['Kode Jurusan', 'Nama Jurusan']
        const tableJrs = new Table({ head: headersJrs });
        rows.forEach((row) => {
          tableJrs.push(Object.values(row));
        });
        console.log(tableJrs.toString());
        break;
      case 'Dosen':
        const headersDsn = ['NIP', 'Nama Dosen', 'Jurusan']
        const tableDsn = new Table({ head: headersDsn });
        rows.forEach((row) => {
          tableDsn.push(Object.values(row));
        });
        console.log(tableDsn.toString());
        break;
      case 'Mata Kuliah':
        const headersMK = ['Kode Matkul', 'Nama Matkul', 'SKS']
        const tableMK = new Table({ head: headersMK });
        rows.forEach((row) => {
          tableMK.push(Object.values(row));
        });
        console.log(tableMK.toString());
        break;
      case 'Kontrak':
        const headersK = ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
        const tableK = new Table({ head: headersK });
        rows.forEach((row) => {
          tableK.push(Object.values(row));
        });
        console.log(tableK.toString());
        break;
    }
  }

  cariQ(rl, menu, callback) {
    switch (menu) {
      case 'Mahasiswa':
        rl.question(`Masukan NIM Mahasiswa : `, (input) => {
          callback(null, input);
        })
        break;
      case 'Jurusan':
        rl.question(`Masukan Kode Jurusan : `, (input) => {
          callback(null, input);
        })
        break;
      case 'Dosen':
        rl.question(`Masukan NIP Dosen : `, (input) => {
          callback(null, input);
        })
        break;
      case 'Mata Kuliah':
        rl.question(`Masukan Kode Mata Kuliah : `, (input) => {
          callback(null, input);
        })
        break;
      case 'Kontrak':
        rl.question(`Masukan NIM Mahasiswa : `, (input) => {
          callback(null, input);
        })
        break;
    }
  }

  cariQError(menu, input) {
    switch (menu) {
      case 'Mahasiswa':
        console.log(`Mahasiswa dengan nim ${input}, tidak terdaftar`)
        break;
      case 'Jurusan':
        console.log(`Jurusan dengan kode ${input}, tidak terdaftar`)
        break;
      case 'Dosen':
        console.log(`Dosen dengan nip ${input}, tidak terdaftar`)
        break;
      case 'Mata Kuliah':
        console.log(`Mata Kuliah dengan kode ${input}, tidak terdaftar`)
        break;
      case 'Kontrak':
        console.log(`Mahasiswa NIM ${input} tidak memiliki kontrak`)
        break;
    }
  }

  cariShow(menu, input, rows) {
    switch (menu) {
      case 'Mahasiswa':
        console.log(`

==================================================
Detail Mahasiswa dengan NIM '${input}' :
NIM     : ${rows[0].nim}
Nama    : ${rows[0].nama_lengkap}
Alamat  : ${rows[0].alamat}
Jurusan : ${rows[0].kode_jurusan}         
        `)
        break;
      case 'Jurusan':
        console.log(`

==================================================
Detail Jurusan dengan kode '${input}' :
Kode Jurusan      : ${rows[0].kode_jurusan}
Nama Jurusan      : ${rows[0].nama_jurusan}        
        `)
        break;
      case 'Dosen':
        console.log(`

==================================================
Detail Dosen dengan NIP '${input}' :
NIP         : ${rows[0].nip}
Nama Dosen  : ${rows[0].nama_lengkap}
Jurusan     : ${rows[0].kode_jurusan}         
        `)
        break;
      case 'Mata Kuliah':
        console.log(`

==================================================
Detail Mata Kuliah dengan Kode '${input}' :
Kode Mata Kuliah  : ${rows[0].kode_mata_kuliah}
Nama Mata Kuliah  : ${rows[0].nama_mata_kuliah}
Jumlah SKS        : ${rows[0].jumlah_sks}    
Jurusan           : ${rows[0].kode_jurusan}  
        `)
        break;
      case 'Kontrak':
        const headersK = ['ID', 'NIM', 'Kode Mata Kuliah', 'NIP', 'Nilai']
        const tableK = new Table({ head: headersK });
        rows.forEach((row) => {
          tableK.push(Object.values(row));
        });
        console.log(`Daftar kontrak mahasiswa dengan NIM ${rows[0].nim} adalah:`)
        console.log(tableK.toString());
        break;
      case 'UpdateNilai':
        const headersUN = ['ID', 'Mata Kuliah', 'Nilai']
        const tableUN = new Table({ head: headersUN });
        rows.forEach((row) => {
          tableUN.push(Object.values(row));
        });
        console.log(`Detail mahasiswa dengan NIM ${rows[0].nim} adalah:`)
        console.log(tableUN.toString());
        break;
    }
  }

  async tambahQ(rl, menu, callback) {
    switch (menu) {
      case 'Mahasiswa':
        let mhs ={}
        mhs.nim = await this.askSeq(rl, 'NIM: ');
        mhs.nama = await this.askSeq(rl, 'Nama: ');
        mhs.bod = await this.askSeq(rl, 'Tanggal Lahir: ');
        mhs.alamat = await this.askSeq(rl, 'Alamat: ');
        callback(null, mhs);
        break;
      case 'MhsJurusan':
        let mhsJrs = await this.askSeq(rl, 'Kode Jurusan: ');
        callback(null, mhsJrs);
        break;
      case 'Jurusan':
        let jrs ={}
        jrs.kode = await this.askSeq(rl, 'Kode Jurusan: ');
        jrs.nama = await this.askSeq(rl, 'Nama Jurusan: ');
        callback(null,jrs)
        break;
      case 'Dosen':
        let dsn ={}
        dsn.nip = await this.askSeq(rl, 'NIP: ');
        dsn.nama = await this.askSeq(rl, 'Nama: ');
        callback(null, dsn)
        break;
      case 'DsnJurusan':
        let dsnJrs = await this.askSeq(rl, 'Kode Jurusan: ');
        callback(null,dsnJrs)
        break;
      case 'Mata Kuliah':
        let mk ={}
        mk.kode = await this.askSeq(rl, 'Kode Mata Kuliah: ');
        mk.nama = await this.askSeq(rl, 'Nama Mata Kuliah: ');
        mk.sks = await this.askSeq(rl, 'Jumlah SKS: ');
        callback(null, mk);
        break;
      case 'MKJurusan':
        let mkJrs = await this.askSeq(rl, 'Kode Jurusan: ');
        callback(null, mkJrs)
        break;  
      case 'KontrakNIM':
        let kontrak={}
        kontrak.nim = await this.askSeq(rl, 'Masukkan NIM: ');
        callback(null, kontrak)
        break;
      case 'KontrakMK':
        let kMK = await this.askSeq(rl, 'Masukkan Kode Mata Kuliah: ');
        callback(null, kMK)
        break;
      case 'KontrakDosen':
        let kDsn = await this.askSeq(rl, 'Masukkan NIP Dosen: ');
        callback(null, kDsn)
        break;
    }
  }

  askSeq(rl, question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  async tambahMahasiswa(rl) {
    let mhs = {};

    mhs.nim = await this.askSeq(rl, 'NIM: ');
    mhs.nama = await this.askSeq(rl, 'Nama: ');
    mhs.bod = await this.askSeq(rl, 'Tanggal Lahir: ');
    mhs.alamat = await this.askSeq(rl, 'Alamat: ');


    return mhs;
  }

  hapusQ(rl, menu, callback) {
    switch (menu) {
      case 'Mahasiswa':
        rl.question(`Masukan NIM Mahasiswa : `, (input) => {
          callback(null, input);
        })
        break;
      case 'Jurusan':
        rl.question(`Masukan Kode Jurusan : `, (input) => {
          callback(null, input);
        })
        break;
      case 'Dosen':
        rl.question(`Masukan NIP Dosen : `, (input) => {
          callback(null, input);
        })
        break;
      case 'Mata Kuliah':
        rl.question(`Masukan Kode Mata Kuliah : `, (input) => {
          callback(null, input);
        })
        break;
      case 'Kontrak':
        rl.question(`Masukan ID Kontrak : `, (input) => {
          callback(null, input);
        })
        break;
    }
  }

  hapusDone(menu, input) {
    switch (menu) {
      case 'Mahasiswa':
        console.log(`Data Mahasiswa dengan NIM ${input} telah dihapus`)
        break;
      case 'Jurusan':
        console.log(`Data Jurusan dengan kode ${input} telah dihapus`)
        break;
      case 'Dosen':
        console.log(`Data Dosen dengan NIP ${input} telah dihapus`)
        break;
      case 'Mata Kuliah':
        console.log(`Data Mata Kuliah dengan kode ${input} telah dihapus`)
        break;
      case 'Kontrak':
        console.log(`Data Kontrak dengan ID ${input} telah dihapus`)
        break;

    }
  }

  async inputNilai(rl,callback) {
    let kontrak = {};

    kontrak.id = await this.askSeq(rl, `
====================================================================================================
masukan id yang akan dirubah nilainya : `);
    kontrak.nilai = await this.askSeq(rl, `
====================================================================================================
tulis nilai yang baru : `)

    callback(null,kontrak);
  }
}

module.exports = View;