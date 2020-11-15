const model = require("../models")
const UserHistory = model.UserHistory

module.exports = {
    // fetch all user histories
    index : (req, res) => {    
        UserHistory.findAll()
        .then(data => {
            res.render('users/history/index', {data})
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving user"
            })
        })
    },
    
    // find a single user history with an id
    show : (req,res) => {
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
    },

    // show form create new user 
    new : (req, res) => {
        res.render('users/history/new')
    },
    
    // save new user in to database
    create : (req, res) => {
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
        .then(res.redirect('/userhistory'))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the user biodata"
            })
        })
    },
    
    // show form edit user history
    edit : (req,res) => {
        const id = req.params.id
    
        UserHistory.findByPk(id)
        .then(data => {
            res.render('users/history/edit', {data})
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user history with id="+ id
            })
        })
    },
    
    // update a user history by the id in the request
    update : (req, res) => {
        const id = req.params.id
    
        UserHistory.update(req.body, {
            where: {id: id}
        })
        .then(num => {
            if (num == 1) {
                // res.send({
                //     message: "User history was updated successfully"
                // })
                res.redirect('/userhistory')
            } else {
                res.send({
                    message: `Cannot update user history with id=${id}. Maybe user history was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user history with id="+id
            })
        })
    },
    
    // delete a user history with the specified id in the request
    delete : (req, res) => {
        const {id} = req.params
    
        UserHistory.destroy({
            where: {id: id}
        })
        .then(num => {
            if (num == 1) {
                res.redirect('/userhistory')
            } else {
                res.send({
                    message: `Cannot delete user history with id=${id}. Maybe user history was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user history with id="+id                
            })
        })
    }
}
