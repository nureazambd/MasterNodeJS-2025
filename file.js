const fs = require("fs");

// sync....
fs.writeFileSync("./newfile.txt", "hello node js file")
console.log(fs.readFileSync("./newfile.txt", "utf-8"))

// async
fs.writeFile("./newfile2.txt", "async file content", (err)=>{err})
fs.readFile("./newfile2.txt", "utf-8", (err, result)=>{
    if(err) {console.log(err)}
    console.log(result)
})
