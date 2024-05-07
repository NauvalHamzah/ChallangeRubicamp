function spellingWord(Word) {
    const dictionary = ['pro', 'gram', 'merit', 'program', 'it', 'programmer'];
    let results = [];

    function subSpellingWord(subWord, hasil) {
        if (subWord === '') {
            results.push(hasil.join(','));
            return;
        }
        for (let item of dictionary) {
            if (subWord.startsWith(item)) {
                let remainingWord = subWord.slice(item.length);
                subSpellingWord(remainingWord, [hasil, item]);
            }
        }
    }

    for (let item of dictionary) {
        if (Word.startsWith(item)) {
            let remainingWord = Word.slice(item.length);
            subSpellingWord(remainingWord, [item]);

        }
    }
    if (results.length > 0) {
        console.log(results.join("\n"));
    } else { console.log("no way") }
}

spellingWord("programmerit");
