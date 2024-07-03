const readline = require('readline');

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });
  }

  run() {
    this.view.welcomeMessage()
    this.userNameCheck()
  }

  userNameCheck() {
    this.view.promptUserName(this.rl, (username) => {
      this.model.checkUserName(username, (err, exist) => {
        if (err) {
          console.log("Data yang Anda masukkan salah")
        } else {
          if (exist) {
            this.passwordCheck(username);
          } else {
            console.log("username tidak terdaftar");
            this.userNameCheck();
          }
        };
      });
    });
  }

  passwordCheck(username) {
    this.view.promptPassword(this.rl, (password) => {
      this.model.checkPassword(username, password, (err, user) => {
        if (err) {
          console.log("Data yang Anda masukkan salah")
        } else {
          if (user.password === password) {
            this.view.loginSuccess(user)
            this.mainMenu()
          } else {
            console.log("password salah");
            this.passwordCheck(username)
          }

        }
      })
    })
  }

  mainMenuSwitch(menu) {
    switch (menu) {
      case ('1'):
        return "Mahasiswa";
      case ('2'):
        return "Jurusan";
      case ('3'):
        return "Dosen";
      case ('4'):
        return "Mata Kuliah";
      case ('5'):
        return "Kontrak";
      case ('6'):
        return "Keluar";
      default:
        return "Tidak ada Menu"
    }
  }

  subMenuSwitch(subMenu, menu) {
    switch (subMenu) {
      case ('1'):
        this.model.daftar(menu, (err, rows) => {
          this.view.daftar(menu, rows);
          this.view.menuPilihan(this.rl, menu, (subMenu) => {
            this.subMenuSwitch(subMenu, menu);
          });
        });
        break;
      case ('2'):
        if (menu != "Kontrak") {
          this.cariHandle(this.rl, menu)
        }
        else {
          this.model.daftar("Mahasiswa", (err, rows) => {
            this.view.daftar("Mahasiswa", rows);
            this.cariHandle(this.rl, menu)
          }
          )
        }
        break;
      case ('3'):
        if (menu != "Kontrak") {
          this.tambahHandle(this.rl, menu)
        } else { this.tambahHandleKontrak(this.rl) }
        break;
      case ('4'):
        this.view.hapusQ(this.rl, menu, (err, input) => {
          this.model.hapus(menu, input, (err, status) => {
            if (err || status === 0) {
              console.log("Data yang Anda masukan salah");
              this.view.menuPilihan(this.rl, menu, (subMenu) => {
                this.subMenuSwitch(subMenu, menu)
              });
            }
            else {
              this.view.hapusDone(menu, input);
              this.view.menuPilihan(this.rl, menu, (subMenu) => {
                this.subMenuSwitch(subMenu, menu)
              });
            }
          })
        })
        break;
      case ('5'):
        if (menu === 'Kontrak') {
          this.model.daftar(menu, (err, rows) => {
            this.view.daftar(menu, rows);
            this.view.cariQ(this.rl, 'Mahasiswa', (err, nim) => {
              this.model.cari('UpdateNilai', nim, (err, rows) => {
                if (!rows || err || Object.keys(rows).length === 0) {
                  console.log("Data yang Anda masukkan salah");
                  this.view.menuPilihan(this.rl, menu, (subMenu) => {
                    this.subMenuSwitch(subMenu, menu);
                  });
                } else {
                  this.view.cariShow('UpdateNilai', nim, rows);
                  this.view.inputNilai(this.rl, (err, newValue) => {
                    newValue.nim = nim;
                    this.model.updateNilai(newValue, (err, statusUpdate) => {
                      if (err || statusUpdate === 0) {
                        console.log("Data yang Anda masukkan salah")
                        this.view.menuPilihan(this.rl, menu, (subMenu) => {
                          this.subMenuSwitch(subMenu, menu);
                        });
                      } else {
                        console.log("Nilai telah diupdate");
                        this.model.daftar(menu, (err, rows) => {
                          this.view.daftar(menu, rows);
                          this.view.menuPilihan(this.rl, menu, (subMenu) => {
                            this.subMenuSwitch(subMenu, menu);
                          });
                        })
                      }
                    })
                  })
                }
              })
            })
          });
          break;
        } else { this.mainMenu() }
        break;
      case ('6'):
        if (menu === 'Kontrak') {
          this.mainMenu()
          break;
        } else {
          console.log("Tidak ada di menu")
          this.view.menuPilihan(this.rl, menu, (subMenu) => {
            this.subMenuSwitch(subMenu, menu)
          });
          break;
        }
      default:
        console.log("Tidak ada di menu")
        this.view.menuPilihan(this.rl, menu, (subMenu) => {
          this.subMenuSwitch(subMenu, menu)
        });

    }
  }

  mainMenu() {
    this.view.mainMenu(this.rl, (menu) => {
      let menuInput = this.mainMenuSwitch(menu);
      if (menuInput === "Keluar") {
        console.log(`
===============================================================================================
Anda telah keluar
===============================================================================================
          `)
        this.userNameCheck()
      } else if (menuInput === "Tidak ada Menu") {
        console.log("Pilih sesuai dengan opsi yang tersedia!");
        this.mainMenu();
      } else {
        this.view.menuPilihan(this.rl, menuInput, (subMenu) => {
          this.subMenuSwitch(subMenu, menuInput)
        });
      }
    });
  }

  cariHandle(rl, menu) {
    this.view.cariQ(rl, menu, (err, input) => {
      this.model.cari(menu, input, (err, rows) => {
        if (!rows || err) {
          console.log("Data yang Anda masukkan salah");
          this.view.menuPilihan(this.rl, menu, (subMenu) => {
            this.subMenuSwitch(subMenu, menu);
          });
        }
        else if (Object.keys(rows).length === 0) {
          this.view.cariQError(menu, input);
          this.view.menuPilihan(this.rl, menu, (subMenu) => {
            this.subMenuSwitch(subMenu, menu);
          });
        } else {
          this.view.cariShow(menu, input, rows);
          this.view.menuPilihan(this.rl, menu, (subMenu) => {
            this.subMenuSwitch(subMenu, menu);
          });
        }
      })
    })
  }

  tambahHandle(rl, menu) {
    console.log('Lengkapi data di bawah ini :');
    this.model.daftar(menu, (err, rows) => {
      this.view.daftar(menu, rows);
      switch (menu) {
        case 'Mahasiswa':
          this.view.tambahQ(rl, menu, (err, addedData) => {
            this.model.daftar('Jurusan', (err, rows) => {
              this.view.daftar('Jurusan', rows);
              this.view.tambahQ(rl, 'MhsJurusan', (err, mhsJrs) => {
                addedData.kode_jurusan = mhsJrs;
                this.model.tambah(menu, addedData, (err, statusAdd) => {
                  if (err) {
                    console.log("Data yang Anda masukkan salah")
                    this.view.menuPilihan(this.rl, menu, (subMenu) => {
                      this.subMenuSwitch(subMenu, menu);
                    });
                  }
                  else {
                    console.log("Mahasiswa telah ditambahkan ke database")
                    this.model.daftar(menu, (err, rows) => {
                      this.view.daftar(menu, rows)
                      this.view.menuPilihan(this.rl, menu, (subMenu) => {
                        this.subMenuSwitch(subMenu, menu);
                      });
                    })
                  }
                })
              })
            })
          })
          break;
        case 'Jurusan':
          this.view.tambahQ(rl, menu, (err, addedData) => {
            this.model.tambah(menu, addedData, (err, statusAdd) => {
              if (err) {
                console.log("Data yang Anda masukkan salah")
                this.view.menuPilihan(this.rl, menu, (subMenu) => {
                  this.subMenuSwitch(subMenu, menu);
                });
              }
              else {
                console.log("Jurusan telah ditambahkan ke database")
                this.view.menuPilihan(this.rl, menu, (subMenu) => {
                  this.subMenuSwitch(subMenu, menu);
                });
              }
            })
          })
          break;
        case 'Dosen':
          this.view.tambahQ(rl, menu, (err, addedData) => {
            this.model.daftar('Jurusan', (err, rows) => {
              this.view.daftar('Jurusan', rows);
              this.view.tambahQ(rl, 'DsnJurusan', (err, dsnJrs) => {
                addedData.kode_jurusan = dsnJrs;
                this.model.tambah(menu, addedData, (err, statusAdd) => {
                  if (err) {
                    console.log("Data yang Anda masukkan salah")
                    this.view.menuPilihan(this.rl, menu, (subMenu) => {
                      this.subMenuSwitch(subMenu, menu);
                    });
                  }
                  else {
                    console.log("Dosen telah ditambahkan ke database")
                    this.view.menuPilihan(this.rl, menu, (subMenu) => {
                      this.subMenuSwitch(subMenu, menu);
                    });
                  }
                })
              })
            })
          })
          break;
        case 'Mata Kuliah':
          this.view.tambahQ(rl, menu, (err, addedData) => {
            this.model.daftar('Jurusan', (err, rows) => {
              this.view.daftar('Jurusan', rows);
              this.view.tambahQ(rl, 'MKJurusan', (err, mkJrs) => {
                addedData.kode_jurusan = mkJrs;
                this.model.tambah(menu, addedData, (err, statusAdd) => {
                  if (err) {
                    console.log("Data yang Anda masukkan salah")
                    this.view.menuPilihan(this.rl, menu, (subMenu) => {
                      this.subMenuSwitch(subMenu, menu);
                    });
                  }
                  else {
                    console.log("Mata Kuliah telah ditambahkan ke database")
                    this.view.menuPilihan(this.rl, menu, (subMenu) => {
                      this.subMenuSwitch(subMenu, menu);
                    });
                  }
                })
              })
            })
          })
          break;
      }
    })
  }

  tambahHandleKontrak(rl) {
    console.log('Lengkapi data di bawah ini :');
    this.model.daftar('Mahasiswa', (err, rows) => {
      this.view.daftar('Mahasiswa', rows)
      this.view.tambahQ(rl, 'KontrakNIM', (err, addedData) => {
        this.model.daftar('Mata Kuliah', (err, rows) => {
          this.view.daftar('Mata Kuliah', rows)
          this.view.tambahQ(rl, 'KontrakMK', (err, kontrakMK) => {
            addedData.kMK = kontrakMK;
            this.model.daftar('Dosen', (err, rows) => {
              this.view.daftar('Dosen', rows)
              this.view.tambahQ(rl, 'KontrakDosen', (err, kontrakDsn) => {
                addedData.kDsn = kontrakDsn;
                this.model.tambah('Kontrak', addedData, (err, statusAdd) => {
                  if (err) {
                    console.log("Data yang Anda masukkan salah")
                    this.view.menuPilihan(this.rl, 'Kontrak', (subMenu) => {
                      this.subMenuSwitch(subMenu, 'Kontrak');
                    });
                  }
                  else {
                    console.log('kontrak telah ditambahkan')
                    this.model.daftar('Kontrak', (err, rows) => {
                      this.view.daftar('Kontrak', rows)
                      this.view.menuPilihan(this.rl, 'Kontrak', (subMenu) => {
                        this.subMenuSwitch(subMenu, 'Kontrak');
                      });
                    })
                  }
                })
              })
            })
          })
        })

      });
    })
  }

  temporaryTambah(rl, menu) {
    console.log('Lengkapi data di bawah ini :')
    this.model.daftar(menu, (err, rows) => {
      this.view.daftar(menu, rows);
      this.view.tambahQ(this.rl, menu, (err, addData) => {
        this.model.daftar('Jurusan', (err, rows) => {
          this.view.daftar('Jurusan', rows);
          this.view.tambahQ(this.rl, 'MahasiswaJurusan', (err, mhsJrs) => {
            addData.kode_jurusan = mhsJrs;
            this.model.tambah(menu, addData, (err, status) => {
              if (status === 0 || err) {
                console.log("Data yang Anda masukan salah");
                this.view.menuPilihan(this.rl, menu, (subMenu) => {
                  this.subMenuSwitch(subMenu, menu)
                });
              }
              else {
                console.log("Mahasiswa telah ditambahkan dan " + status)
                this.model.daftar("Mahasiswa", (err, rows) => {
                  this.view.daftar("Mahasiswa", rows);
                  this.view.menuPilihan(this.rl, menu, (subMenu) => {
                    this.subMenuSwitch(subMenu, menu)
                  });
                });
              }
            })
          })
        })
      });
    });
  }
}


module.exports = Controller;
