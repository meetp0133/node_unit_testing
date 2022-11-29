const express = require("express")
const route = new express.Router
const controller= require("../controller/user.controller")
const controoler = require("../controller/student.controller")

route.get("/list",controller.listUser)
route.get("/list1",controoler.user)
module.exports = route