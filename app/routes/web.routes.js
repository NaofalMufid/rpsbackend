const { users } = require("../models")

module.exports = app => {
    const users = require("../controllers/user.controller")

    var router = require("express").Router()

    /**
     * Dashbord view router */


    // auth route
    router.get("/login", users.ViewLogin)
    
    // 
    router.post("/login", users.login)

    // route dashboard
    router.get("/dashboard", users.home) 

    /**
     * User Game Route
     */
    
    // index user 
    router.get("/users", users.findAll)

    // show form add
    router.get("/new/user", users.new)

    // add user
    router.post("/users", users.create)

    // show form edit

    // edit user
    router.get("/user/:id", users.edit)

    // update user
    router.post("/users/:id/update", users.update)

    // delete user
    router.post("/user/:id/delete", users.delete)

    /**
     * User Game Biodata Route
     */
    
    /**
     * User Game  History Route
     */ 

    app.use("/", router)
}