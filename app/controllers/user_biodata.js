const model = require("../models")
const UserBiodata = model.UserBiodata
module.exports = {
    // fetch all user biodata
    index : (req, res) => {
        UserBiodata.findAll()
            .then(userbiodata => {
                res.render('users/biodata/index', {userbiodata})
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error ocurred while retrieving user"
                })
            })
    },

    // find a single user with an id
    show : (req,res) => {
        const id = req.params.id
        UserBiodata.findByPk(id)
            .then(userbiodata => {
                res.send(userbiodata)
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving user with id="+ id
                })
            })
    },
    
    // show form create new user biodata
    new : (req, res) => {
        res.render('users/biodata/new')
    },

    // save new user biodata to database
    create : (req, res) => {
        // validate request
        if (!req.body.user_id) {
            res.status(400).send({
                message: "Content cannot be empty"
            })
            return
        }
    
        // create a user biodata
        const newbiodata = {
            user_id: req.body.user_id,
            name: req.body.name,
            gender: req.body.gender,
            address: req.body.address,
            avatar: req.body.avatar
        }
    
        // save user biodata in the database
        UserBiodata.create(newbiodata)
        .then(res.redirect('/userbiodata'))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the user"
            })
        })
    },
    
    // show edit form user biodata
    edit : (req,res) => {
        const id = req.params.id
    
        UserBiodata.findByPk(id)
        .then(data => {
            res.render('users/biodata/edit', {data})
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id="+ id
            })
        })
    },
    
    // update a user biodta by the id in the request
    update : (req, res) => {
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
    },
    
    // delete a user with the specified id in the request
    delete : (req, res) => {
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
}
