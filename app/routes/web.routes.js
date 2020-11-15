const Router = require('express-group-router');
let router = new Router();
const auth = require('../controllers/auth')
const user = require('../controllers/user')
const userBiodata = require('../controllers/user_biodata')
const userHistory = require('../controllers/user_history')
const restrict = require('../middlewares/restrict')

/**
 * Auth Route
 */

 // register user
router.get('/register', auth.signup)
router.post('/register', auth.register)
// login user
router.get('/login', auth.signin)
router.post('/login', auth.login)
// logout
router.get('/logout', auth.logout)

//  End Auth Route

router.group([restrict], (router) => {
    // /Homepage
    router.get('/', auth.home)
    
    /**
     * User Route
     */
    // show all user 
    router.get("/users", user.index)
    
    // show form add user
    router.get("/new/user", user.new)
    
    // save user to database
    router.post("/users", user.create)
    
    // show form edit
    router.get("/user/:id", user.edit)
    
    // update user to database
    router.post("/users/:id/update", user.update)

    // delete user from database
    router.post("/users/:id/delete", user.destroy)
    //  End User Route
    /**
     * User Biodata Route
     */
    
    // show all userBiodata 
    router.get("/userbiodata", userBiodata.index)
    
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
    
    //  End User Biodata Route
    
    /**
     * User History Route
     */
    
    // show all userBiodata 
    router.get("/userhistory", userHistory.index)
    
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
    
    //  End User History Route
})

const listRoutes = router.init()

module.exports = listRoutes
