const express = require("express")
const app = express()
const port = 4004
require("./db/conn")
app.get("/",(req,res)=>{
    res.send("<h1>Hello,Wel-come to chai mocha unit testing..!!!</h1>")
})

const userModel = require("./routes/user.routes")
app.use(userModel)
app.listen(port,()=>{
    console.log(`You port is http://localhost:${port}`)
})