const { users } = require("../models")

module.exports = app => {

    const auth = require("../controllers/auth")
    const userGame = require("../controllers/userGame")
    const userBiodata = require("../controllers/userGameBiodata")
    const userHistory = require("../controllers/userGameHistory")

    var router = require("express").Router()

    /**
     * Dashbord view router */

    // route direct to form login
    router.get("/login", auth.signin)
    
    // check user auth
    router.post("/login", auth.login)

    // route dashboard
    router.get("/", auth.home) 

    /**
     * User Game Route
     */

    // show all userGame 
    router.get("/users", userGame.findAll)

    // show form add user
    router.get("/new/user", userGame.new)

    // save user to database
    router.post("/users", userGame.create)

    // show form edit
    router.get("/user/:id", userGame.edit)

    // update user to database
    router.post("/users/:id/update", userGame.update)

    // delete user from database
    router.post("/users/:id/delete", userGame.delete)

    /**
     * User Game Biodata Route
     */
    
    // show all userBiodata 
    router.get("/userbiodata", userBiodata.findAll)

    // show form add user
    router.get("/new/userbiodata", userBiodata.new)

    // save user to database
    router.post("/userbiodata", userBiodata.create)

    // show form edit
    router.get("/userbiodata/:id", userBiodata.edit)

    // update user to database
    router.post("/userbiodata/:id/update", userBiodata.update)

    // delete user from database
    router.post("/userbiodata/:id/delete", userBiodata.delete)

    /**
     * User Game  History Route
     */
    // show all userBiodata 
    router.get("/userhistory", userHistory.findAll)

    // show form add user
    router.get("/new/userhistory", userHistory.new)

    // save user to database
    router.post("/userhistory", userHistory.create)

    // show form edit
    router.get("/userhistory/:id", userHistory.edit)

    // update user to database
    router.post("/userhistory/:id/update", userHistory.update)

    // delete user from database
    router.post("/userhistory/:id/delete", userHistory.delete)

    app.use("/", router)
}