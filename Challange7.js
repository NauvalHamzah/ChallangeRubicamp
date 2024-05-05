function weirdMultiply(sentence){
    sentence = sentence.toString();
    if (sentence.length===1){
        return sentence;
    } else {
        sentence = sentence.split('');
        sentence = sentence.reduce((total,num) => total*num );
        return weirdMultiply(sentence)
    }
}

console.log(weirdMultiply(39))
console.log(weirdMultiply(999))
console.log(weirdMultiply(3))