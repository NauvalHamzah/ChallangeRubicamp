function sentenceManipulation(sentence) {
    let word = sentence.split(" ");
    let modifiedWord = word.map(stringManipulation)
    console.log(modifiedWord.join(" "))
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


sentenceManipulation('ibu pergi ke pasar bersama aku')