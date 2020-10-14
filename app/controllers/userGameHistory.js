const db = require("../models")
const UserHistory = db.userGameHistory
const Op = db.Sequelize.Op

// create and save a new user
exports.new = (req, res) => {
    res.render('users/addUserHistory')
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
    const userHistory = {
        user_id: req.body.user_id,
        score: req.body.score
    }

    // save user History in the database
    UserHistory.create(userHistory)
        .then(data => {
            res.redirect('/userHistory')
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

    UserHistory.findAll()
        .then(data => {
            res.render('users/listUserGameHistory', {data})
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

    UserHistory.findByPk(id)
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

    UserHistory.findByPk(id)
        .then(data => {
            res.render('users/editUserGameHistory', {data})
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

    UserHistory.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                // res.send({
                //     message: "User was updated successfully"
                // })
                res.redirect('/userhistory')
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

    UserHistory.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.redirect('/userhistory')
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