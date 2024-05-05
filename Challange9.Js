function spiral(param1) {
    matriks = [];
    for (let i = 0; i < param1; i++) {
        matriks[i] = [];
        for (let j = 0; j < param1; j++) {
            matriks[i][j] = param1 * i + j;
        }
    }
    result = rearrange(matriks);

    function rearrange(matriks) {
        if (matriks.length === 0) {
            return;
        }
        else if (matriks.length === 1) {
            return [matriks[0][0]];
        } else if (matriks.length === 2) {
            array = [matriks[0][0], matriks[0][1], matriks[1][1], matriks[1][0]];
            return array;
        } else {
            let newMatriks = matriks.slice(1, matriks.length - 1).map(row => row.slice(1, matriks.length - 1));
            hasil = rearrange(newMatriks);

            for (let d = 1; d < matriks[0].length; d++) { hasil.unshift(matriks[d][0]) }
            for (let c = 1; c < matriks[0].length; c++) { hasil.unshift(matriks[matriks[0].length - 1][c]) }
            for (let b = matriks[0].length - 2; b >= 0; b--) { hasil.unshift(matriks[b][matriks[0].length - 1]) }
            for (let a = matriks[0].length - 2; a >= 0; a--) { hasil.unshift(matriks[0][a]) }

            return hasil;
        }
    }
    return result;
}

console.log(spiral(5));
console.log(spiral(6));
console.log(spiral(7));
