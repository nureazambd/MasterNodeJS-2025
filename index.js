const express = require('express')
const app = express()
const math = require("./math.js")

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/add', (req, res)=>{
    const sum =math.add(4, 6)
    res.send(JSON.stringify(sum))
    console.log(sum)
})

app.get('/sub', (req, res)=>{
    const sub =math.sub(40, 6)
    res.send(JSON.stringify(sub))
    console.log(sub)
})

app.listen(3000)