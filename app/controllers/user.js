const model = require('../models')
const UserGame = model.User 

module.exports = {
    // fetch all user
    index: (req, res) => {
        UserGame.findAll()
        .then(users => {
            res.render('users/index', {users})
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while retrieving user"
            })
        })
    },

    // fetch one user by id
    show: (req, res) => {
        const id = req.params.id

        UserGame.findByPk(id)
        .then(user => { res.send(user) })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id="+ id
            })
        })
    },

    // show form create new user
    new: (req, res) => {
        res.render('users/new')
    },

    // save new user to database
    create: (req, res) => {
        // validate user
        if(!req.body.username){
            res.status(400).send({
                message: "Content cannot be empty"
            })
            return
        }

        // create a user
        const newuser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        // save user in the database
        UserGame.register(newuser)
        .then(
            res.redirect('/users')
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the user"
            })
        })
    },

    // show form edit user
    edit: (req, res) => {
        const id = req.params.id

        UserGame.findByPk(id)
        .then(user => {
            res.render('users/edit', {user})
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id="+ id
            })
        })
    },

    // update user to database
    update: (req, res) => {
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
                message: "Error updating user with id=" + id
            })
        })
    },

    // delete user from database
    destroy: (req, res) => {
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
    },
}