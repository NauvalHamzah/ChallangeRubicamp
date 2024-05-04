function indexPrime(param1) {
    let counter = 0;
    let num = 2;
    let primeNum = 0;
    while (counter < param1) {
        let isPrime = true;
        if (num === 2) {
            primeNum = num;
            counter++;
        } else {
            for (i = 2; i < num && isPrime === true; i++) {
                if (num % i === 0) {
                    isPrime = false;
                }
            }
            if (isPrime === true) {
                primeNum = num;
                counter++;
            }

        }
        num++;
    }
    return primeNum
}

console.log(indexPrime(100))