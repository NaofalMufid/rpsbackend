const Router = require('express-group-router');
let router = new Router();
const auth = require('../controllers/api/auth')
const player = require('../controllers/api/player')
const gameasset = require('../controllers/api/gameasset')
const restrict_jwt = require('../middlewares/restrict_jwt')

module.exports = app =>{
    /**
     * Auth Routes
     */
    
    // register user
    router.post('/register', auth.register)
    // login user
    router.post('/login', auth.login)
    router.get('/whoami', restrict_jwt, auth.whoami)
    //  End Auth Routes
    
    // api challenge 8
    router.get("players", player.index)
    router.get("searchplayer", player.index)
    router.get("editplayers/:id", player.show)

    router.group([restrict_jwt], (router) => {
        // show all assets 
        router.get("/assets", gameasset.findAll)
        
        // retrieve a singe asset with id 
        router.get("/assets/:id", gameasset.findOne)

        // show player by id
        router.get("players/:id", player.show)
        // update player 
        router.post("players/:id/update", player.update)
    })
    
    const listRoutes = router.init()
    app.use("/api/v1/", listRoutes)
}
