const express = require("express")
const route = new express.Router
const controller = require("../controller/user.controller")

route.get("/list", controller.listUser)
route.get("/view/:id", controller.viewUser)
route.post("/create", controller.create)

module.exports = route