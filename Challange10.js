const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question('tulis kalimatmu di sini > ', (input) => {
        if (input.toLowerCase() === 'good bye!') {
            rl.close();
        } else {
            output = sentenceManipulation(input)
            console.log(`hasil konversi: ${output}`);
            promptUser();
        }
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
