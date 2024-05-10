const { readFileSync } = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

isiData = JSON.parse(readFileSync('data.json', 'utf8'))

console.log("Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!")

function tebakKata(i = 0) {
  if (i >= isiData.length) {
    console.log("Hore Anda menang!")
    rl.close();
  } else {
    rl.question('Pertanyaan: ' + isiData[i].definition + '\nJawaban: ', (tebakan) => {
      if (tebakan === isiData[i].term) {
        console.log("Selamat Anda benar!\n");
        i++;
        tebakKata(i);
      } else {
        console.log("Wkwkwk, Anda kurang beruntung!\n");
        tebakKata(i);
      }
    });
  }
}

tebakKata()


