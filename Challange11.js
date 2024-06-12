const { readFileSync } = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Tebakan: '
})

isiData = JSON.parse(readFileSync('data.json', 'utf8'))

console.log("Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!")

function tebakKata(i = 0) {
  console.log(`Pertanyaan: ${isiData[i].definition}`)
  rl.prompt()
  rl.on('line', (tebakan) => {
    if (tebakan === isiData[i].term) {
      console.log("Selamat Anda benar!\n");
      i++;
      if (i >= isiData.length) {
        console.log("Hore Anda menang!")
        rl.close();
      } else {
        console.log(`Pertanyaan: ${isiData[i].definition}`)
        rl.prompt()
      }
    } else {
      console.log("Wkwkwk, Anda kurang beruntung!\n");
      rl.prompt()
    }
  });
}

tebakKata()


