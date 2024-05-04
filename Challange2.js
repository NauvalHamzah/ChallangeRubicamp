function deretKaskus(n){
    let deret=[];
    for (let i=0;i<n;i++){
        deret.push((i+1)*3);
        if(deret[i]%5===0 && deret[i]%6===0){
            deret[i]="KASKUS";
        } else if(deret[i]%6===0){
            deret[i]="KUS";
        } else if(deret[i]%5===0){
            deret[i]="KAS";
        }
    }
    return deret;
}

console.log(deretKaskus(10))