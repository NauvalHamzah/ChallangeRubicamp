const { readFileSync } = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt:"Jawaban: "
})

function tebakKata(isiData, i = 0, wrongAns = 0) {
  console.log(`Pertanyaan: ${isiData[i].definition}`)
  rl.prompt()
  rl.on('line', (tebakan) => {
    if (tebakan == "skip"){
      temp = isiData.splice(i, 1)[0];
      isiData.push(temp);
      console.log(`\nPertanyaan: ${isiData[i].definition}`)
      rl.prompt()
      wrongAns=0;
    } else if (tebakan === isiData[i].term) {
      console.log("Selamat Anda benar!\n");
      i++;
      if (i >= isiData.length) {
        console.log("Hore Anda menang!")
        rl.close();
      } else {
        console.log(`Pertanyaan: ${isiData[i].definition}`)
        rl.prompt()
        wrongAns=0;
      }
    } else {
      wrongAns++;
      console.log(`Anda kurang beruntung! anda telah salah ${wrongAns} kali, silahkan coba lagi\n`);
      rl.prompt()
    }
  });
}

function startHandling(initFile) {
  try {
    isiData = JSON.parse(readFileSync(initFile, 'utf8'));
    console.log(`Selamat datang di permainan Tebak-tebakan. kamu akan diberikan pertanyaan dari file ini ${initFile}.\nUntuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi\n`);
    tebakKata(isiData);
  } catch (err) {
    console.log("Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'");
  }
}

function openFile(initFile = '') {
  if (initFile) {
    startHandling(initFile);
  } else {
    console.log("Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'");
    rl.on('line', initFile => {
      startHandling(initFile)
    })
  }
}

openFile("data.json")

