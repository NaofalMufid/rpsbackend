const db = require("../../models")
const GameAsset = db.GameAssets
const Op = db.Sequelize.Op

module.exports = {
    findAll: (req, res) => {
        const name = req.query.name
        var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null
    
        GameAsset.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving game asset"
            })
        })
    },

    findOne: (req,res) => {
        const id = req.params.id
    
        GameAsset.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving game asset with id="+ id
            })
        })
    }    
}