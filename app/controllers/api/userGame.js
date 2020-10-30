const jwt = require('jsonwebtoken')
const passport = require('passport')
require('../../config/passport')(passport)
const db = require("../../models")
const User = db.userGame
const Op = db.Sequelize.Op

// create and save a new user
exports.create = (req, res) => {
    // validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
        return
    }

    // create a user
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    // save user in the database
    User.create(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the user"
            })
        })
}

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

// delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.body.id

    User.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully"
                })
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id="+id                
            })
        })
}

// delete all user from the database
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} User were deleted successfully` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all user"
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