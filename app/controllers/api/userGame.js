const jwt = require('jsonwebtoken')
const passport = require('passport')
require('../../config/passport')(passport)
const db = require("../../models")
const User = db.userGame
const Op = db.Sequelize.Op

// retreive and save users from the database
exports.findAll = (passport.authenticate('jwt', {session:false})),(req, res) => {
    var token = getToken(req.headers)
    console.log(req.headers)
    if (token) {
        const username = req.query.username
        var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null
    
        User.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving user"
            })
        })
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }
}


// find a single user with an id
exports.findOne = (req,res) => {
    const id = req.params.id

    User.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id="+ id
            })
        })
}

// update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id

    User.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully"
                })
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe user was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id="+id
            })
        })
}

// find all by condition
exports.findAllCondition = (req, res) => {
    User.findAll({ where: {username: req.body.username } })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occured while retrieving user"
            })
        })
}

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ')
        if (parted.length === 2) {
            return parted[1]
        } else {
            return null
        }
    } else {
        return null
    }
}