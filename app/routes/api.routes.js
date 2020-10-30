const { users } = require("../models")

module.exports = app => {
    const users = require("../controllers/api/userGame")
    const userauth = require("../controllers/api/auth")

    var router = require("express").Router()

    /**
     * Endpoint API User Games */

    // create a new user
    router.post("/users", users.create)

    // retrieve all user
    router.get("/users", users.findAll)

    // retrieve all user by condition
    router.get("/username", users.findAllCondition)

    // retrieve a singe user with id
    router.get("/user/:id", users.findOne)

    // update a user with id
    router.put("/user/:id", users.update)
    
    // delete a user with id
    router.delete("/user/:id", users.delete)

    // delete all user
    router.delete("/users", users.deleteAll)

    // register
    router.post("/register", userauth.register)

    // login
    router.post("/login", userauth.login)

    
    app.use("/api/", router)
}