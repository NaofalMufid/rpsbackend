const { users } = require("../models")

module.exports = app => {
    const users = require("../controllers/api/user.controller")

    var router = require("express").Router()

    /**
     * Enpoint API router */

    // create a new user
    router.post("/", users.create)

    // retrieve all user
    router.get("/", users.findAll)

    // retrieve all user by condition
    router.get("/username", users.findAllCondition)

    // retrieve a singe user with id
    router.get("/:id", users.findOne)

    // update a user with id
    router.put("/:id", users.update)
    
    // delete a user with id
    router.delete("/:id", users.delete)

    // delete all user
    router.delete("/", users.deleteAll)

    app.use("/api/users", router)
}