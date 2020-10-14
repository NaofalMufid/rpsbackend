const db = require("../models")
const UserBiodata = db.userGameBiodata
const Op = db.Sequelize.Op

// create and save a new user biodata
exports.new = (req, res) => {
    res.render('users/addUserBiodata')
}

exports.create = (req, res) => {
    // validate request
    if (!req.body.user_id) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
        return
    }

    // create a user
    const userBiodata = {
        user_id: req.body.user_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
        avatar: req.body.avatar
    }

    // save user biodata in the database
    UserBiodata.create(userBiodata)
        .then(
            res.redirect('/userbiodata')
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

    UserBiodata.findAll()
        .then(data => {
            res.render('users/listUserGameBiodata', {data})
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

    UserBiodata.findByPk(id)
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

    UserBiodata.findByPk(id)
        .then(data => {
            res.render('users/editUserBiodata', {data})
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

    UserBiodata.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                // res.send({
                //     message: "User was updated successfully"
                // })
                res.redirect('/userbiodata')
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

    UserBiodata.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.redirect('/userbiodata')
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
