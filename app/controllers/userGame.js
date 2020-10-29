const db = require("../models")
const UserGame = db.userGame
const UserGameBiodata = db.userGameBiodata
const Op = db.Sequelize.Op

// show form add new user
exports.new = (req, res) => {
    res.render('users/addUserGame')
}

//  save user to database
exports.create = (req, res) => {
    // validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
        return
    }

    // create a user
    const userGame = {
        username: req.body.username,
        password: req.body.password
    }

    // save user in the database
    UserGame.create(userGame)
        .then(
            res.redirect('/users')
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the user"
            })
        })
}

// retreive and save users from the database
exports.findAll = (req, res) => {

    UserGame.findAll().
    then(data => {
        res.render('users/listUserGame', {data})
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error ocurred while retrieving user"
        })
    })
}

// find a single user with an id
exports.findOne = (req,res) => {
    const id = req.params.id

    UserGame.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id="+ id
            })
        })
}

// user edit
exports.edit = (req,res) => {
    const id = req.params.id

    UserGame.findByPk(id)
        .then(data => {
            res.render('users/editUserGame', {data})
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

    UserGame.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                // res.send({
                //     message: "User was updated successfully"
                // })
                res.redirect('/users')
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
    const {id} = req.params

    UserGame.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.redirect('/users')
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