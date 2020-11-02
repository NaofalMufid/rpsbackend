const jwt = require('jsonwebtoken')
const passport = require('passport')
require('../../config/passport')(passport)
const UserGames = require('../../models').userGame

// signup user
exports.register = (req, res) => {
        console.log(req.body)
        if (!req.body.username || !req.body.password) {
            res.status(400).send({msg: 'Please enter username and password'})
        } else {
            UserGames.create({
                username: req.body.username,
                password: req.body.password
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => {
                console.log(error)
                res.status(400).send(error)
            })
        }
}
// signin user
exports.login = (req, res) => {
    UserGames.findOne({
        attributes: ['user_id','username', 'password'],
        where: {username: req.body.username}
    })
    .then((user) => {
        if (!user) {
            return res.status(401).send({
                message: 'Authentication failed. User not found.',
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30})
                jwt.verify(token, 'nodeauthsecret', (err, data) => {
                    console.log(err, data)
                })
                res.json({success: true, token: 'JWT '+token})
            } else {
                res.status(401).send({message: false, msg: 'Authentication failed. Wrong Password.'})
            }
        })
    })
    .catch((error) => {
        console.log(error)
        res.status(400).send(error)
    })
}