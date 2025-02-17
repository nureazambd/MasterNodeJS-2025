const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

app.get("/api/users", (req, res)=>{
    return res.json(users)
})

app.listen(port,()=>console.log(`server run on port: ${port}`))