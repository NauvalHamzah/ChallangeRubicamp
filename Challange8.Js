function pola(str){
    let comp = str.split(" ");
    let res =[]
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            comp1Num = comp[0].replace('#',i);
            comp2Num = comp[4].replace('#',j);
            if(comp1Num*comp[2]==comp2Num){
                res =[i,j]
                return res
            }
        }
        
    }    
}

console.log(pola("42#3 * 188 = 80#204"))
console.log(pola("8#61 * 895 = 78410#5"))