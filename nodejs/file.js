const fs = require("fs");
let charan = "vjkhlkchvjbk";

fs.writeFileSync("vnr.txt",charan);
fs.writeFile("something.txt","hello javascript",(err)=>{
    if(err){
        console.log("There is an error",err);
    }
    else{
        console.log("Write file worked successfully!")
    }
})

fs.readFile("vnr.txt","utf8",(err,data)=>{
    if(err){
        console.log("There is an error",err);
    }
    else{
        console.log("Read file worked successfully!")
        console.log(data);
    }
})

let data = fs.readFileSync("something.txt","utf8");
console.log(data)
