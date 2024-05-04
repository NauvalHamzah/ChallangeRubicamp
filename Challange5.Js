function stringManipulation(word) {
    let kata = word.toLowerCase();
    let newWord = '';
    if ('aiueo'.includes(kata[0])) {
        console.log(word)
    } else {
        newWord = word.slice(1);
        newWord = newWord + word[0] + 'nyo'
        console.log(newWord)
    }

}

stringManipulation('ayam')
stringManipulation('bebek')