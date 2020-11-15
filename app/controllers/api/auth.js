const jwt = require('jsonwebtoken')
const model = require('../../models')
const UserGames = model.User

function format(user) {
    const {id, username} = user
    return{
        id,
        username,
        accessToken: user.generateToken()
    }
}

module.exports = {
    // signup user
    register : (req, res) => {
        console.log(req.body)
        if (!req.body.username || !req.body.password || !req.body.email) {
            res.status(400).send({msg: 'Please enter username, email and password'})
        } else {
            UserGames.register({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(() => res.status(201).send("Successfully user register"))
            .catch((error) => {
                console.log(error)
                res.status(400).send(error)
            })
        }
    },
    // signin user
    login : (req, res) => {
        UserGames.authenticate(req.body)
        .then(user => {
            res.json(
                format(user)
            )
        })
    },

    whoami: (req, res) => {
        res.send("Ok good job you can access this resource")
    }        
}
