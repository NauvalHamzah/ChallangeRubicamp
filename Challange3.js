function romawi(num){
    let baseNum = [1,4,5,9,10,40,50,90,100,400,500,1000];
    let baseRom = ['I','IV','V','IX','X','XL','L','XC','C','CD','D','M'];
    let romNum='';
    let rep=0;
    let sisa=num;
    while(sisa !==0){
        for(let i=baseNum.length;i>0;i--){
            if (Math.floor(sisa/baseNum[i-1])>0){
                rep = Math.floor(sisa/baseNum[i-1]);
                romChar = baseRom[i-1].repeat(rep);
                sisa = sisa%baseNum[i-1];
                romNum=romNum.concat(romChar)
                break;
            }
        }
    }
 
    
    return romNum
}

console.log('Script Testing untuk Konversi Romawi');
console.log('input  |   expected    |   result');
console.log('-------|---------------|---------');
console.log('4      | IV            |',romawi(4));
console.log('9      | IX            |',romawi(9));
console.log('13     | XIII          |',romawi(13));
console.log('1453   | MCDLIII       |',romawi(1453));
console.log('1646   | MDCXLVI       |',romawi(1646));