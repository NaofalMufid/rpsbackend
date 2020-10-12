const db = require("../models")
const User = db.users
const Op = db.Sequelize.Op

// dashboard
exports.home = (req, res) => {
    res.render("dashboard")
}

// create and save a new user
exports.new = (req, res) => {
    res.render('users/add')
}

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

    // save tutorial in the database
    User.create(user)
        .then(data => {
            res.redirect('/users')
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the user"
            })
        })
}

// retreive and save users from the database
exports.findAll = (req, res) => {

    User.findAll()
        .then(data => {
            res.render('users/index', {data})
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

// user edit
exports.edit = (req,res) => {
    const id = req.params.id

    User.findByPk(id)
        .then(data => {
            res.render('users/edit', {data})
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

    User.destroy({
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

// view form login
exports.ViewLogin = (req,res) => {
    res.render("/auth/login")
}

// auth login
exports.login = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username === "adminjan" && password === "janadmin") {
        res.redirect("/dashboard")
    } else {
        res.redirect("/login")
    }
}
