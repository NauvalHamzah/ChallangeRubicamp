const { readFileSync } = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function tebakKata(isiData, i = 0, wrongAns = 0) {
  if (i >= isiData.length) {
    console.log("Anda berhasil!");
    rl.close();
  } else {
    rl.question('Pertanyaan: ' + isiData[i].definition + '\nJawaban: ', (tebakan) => {
      if (tebakan === 'skip') {
        temp = isiData.splice(i, 1)[0];
        isiData.push(temp);
        console.log("\n")
        tebakKata(isiData, i);
      } else if (tebakan === isiData[i].term) {
        console.log("Anda beruntung!\n");
        i++;
        tebakKata(isiData, i);
      } else {
        wrongAns++;
        console.log(`Anda kurang beruntung! anda telah salah ${wrongAns} kali, silahkan coba lagi\n`);

        tebakKata(isiData, i, wrongAns);
      }
    });
  }
}

function openFile(initFile = '') {
  if (initFile) {
    try {
      isiData = JSON.parse(readFileSync(initFile, 'utf8'));
      console.log(`Selamat datang di permainan Tebak-tebakan. kamu akan diberikan pertanyaan dari file ini ${fileName}.\nUntuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi\n`);
      tebakKata(isiData);
    } catch (err) {
      console.log("Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'");
    }
  } else {
    console.log("Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'");
    rl.on('line', fileName => {
      try {
        isiData = JSON.parse(readFileSync(fileName, 'utf8'));
        console.log(`Selamat datang di permainan Tebak-tebakan. kamu akan diberikan pertanyaan dari file ini ${fileName}.\nUntuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi\n`);
        tebakKata(isiData);
      } catch (err) {
        console.log("Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'");
      }

    })
  }
}

openFile()

