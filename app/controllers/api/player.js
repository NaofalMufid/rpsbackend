const model = require('../../models')
const Player = model.User 

module.exports = {
    // fetch all user
    index: (req, res) => {
        Player.findAll()
        .then(users => {
            res.send(users)
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

        Player.findByPk(id)
        .then(user => { res.send(user) })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id="+ id
            })
        })
    },

    // update user to database
    update: (req, res) => {
        const id = req.params.id

        Player.update(req.body, {
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
                message: "Error updating user with id=" + id
            })
        })
    }
}