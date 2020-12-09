const model = require('../../models')
const Player = model.User 
const Op = model.Sequelize.Op
const bcrypt = require('bcrypt')

module.exports = {
    // fetch all user
    index: (req, res) => {

        Player.findAll({
            attributes: ['id', 'username', 'email', 'password']
        })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while retrieving player"
            })
        })
    },

    // search player
    search: (req, res) => {
        const keyword = req.query.keyword

        Player.findAll({
            where:{
                [Op.or]: [
                    keyword ? {username: {[Op.iLike]: `%${keyword}%`}} : null,
                    keyword ? {email: {[Op.iLike]: `%${keyword}%`}} : null,
                ]
            },
            attributes: ['id', 'username', 'email', 'password']
         })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while retrieving player"
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
                message: "Error retrieving player with id="+ id
            })
        })
    },

    // update user to database
    update: async (req, res) => {
        const id = req.params.id
        const hashPassword = await bcrypt.hashSync(req.body.password, 10)
        const player = {
            username: req.body.username,
            email: req.body.username.email,
            password: hashPassword
        }

        Player.update(
            player,
            { where: {id: id} }
        )
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Player was updated successfully"
                })
            } else {
                res.send({
                    message: `Cannot update player with id=${id}. Maybe player was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating player with id=" + id
            })
        })
    },

    // delete player from database
    destroy: (req, res) => {
        const {id} = req.params

        Player.destroy({
            where: {id: id}
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Player was deleted successfully"
                })
            } else {
                res.send({
                    message: `Cannot delete player with id=${id}. Maybe player was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete player with id="+id                
            })
        })
    },
}