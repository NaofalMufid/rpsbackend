const { users, asset } = require("../models")

module.exports = app => {
    const users = require("../controllers/api/userGame")
    const userauth = require("../controllers/api/auth")
    const gameasset = require("../controllers/api/asset")

    var router = require("express").Router()

    /**
     * Endpoint API User Games */


    // retrieve all user
    router.get("/users", users.findAll)

    // retrieve all user by condition
    router.get("/username", users.findAllCondition)

    // retrieve a singe user with id
    router.get("/user/:id", users.findOne)

    // update a user with id
    router.put("/user/:id", users.update)
    
    // register
    router.post("/register", userauth.register)

    // login
    router.post("/login", userauth.login)


    // Game Assets Endpoint
    
    // retrieve all asset
    router.get("/assets", gameasset.findAll)

    // retrieve all asset by condition
    // router.get("/assets/name", gameasset.findAllCondition)

    // retrieve a singe asset with id
    router.get("/asset/:id", gameasset.findOne)
    
    app.use("/api/", router)
}