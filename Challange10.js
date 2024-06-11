const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu di sini > '
});

function promptUser() {
    rl.prompt();

    rl.on('line', (input) => {
        let output = sentenceManipulation(input);
        console.log(`hasil konversi: ${output}`);
        rl.prompt();  
    });

    rl.on('close', () => {
        console.log('good bye!');
        process.exit(0);
    });
}

function sentenceManipulation(sentence) {
    let word = sentence.split(" ");
    let modifiedWord = word.map(stringManipulation);
    let modifiedSentence = modifiedWord.join(" ");
    return modifiedSentence;
}
function stringManipulation(word) {
    let kata = word.toLowerCase();
    let newWord = '';
    if ('aiueo'.includes(kata[0])) {
        return word;
    } else {
        newWord = word.slice(1);
        newWord = newWord + word[0] + 'nyo'
        return newWord;
    }
}

promptUser(); 
