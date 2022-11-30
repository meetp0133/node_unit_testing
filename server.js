const express = require("express")
const app = express()
const port = 4000
const userModel = require("./routes/user.routes")
require("./db/conn")

app.use(express.json())
app.use(userModel)
app.get("/", (req, res) => {
    res.send("<h1>Hello,Wel-come to chai mocha unit testing..!!!</h1>")
})
const server = app.listen(port, () => {
    console.log(`You port is http://localhost:${port}`)
})

module.exports = server