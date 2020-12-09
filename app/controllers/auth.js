<<<<<<< HEAD
// dashboard
exports.home = (req, res) => {
        res.render("dashboard")
}

// view form login
exports.signin = (req,res) => {
    res.render("/auth/login")
}

// auth login
exports.login = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username === "admin" && password === "admin") {
        res.redirect("/")
    } else {
        res.redirect("/login")
    }
}

// logout
exports.logout = (req, res) => {
    res.redirect("/login")
=======
const { User } = require('../models')
const passport = require('../lib/passport_local')

module.exports = {
    // show form register
    signup: (req, res) => {
        res.render('auth/register')
    },

    // register user
    register: (req, res, next) => {
        User.register(req.body)
        .then(() => {
            res.redirect('/login')
        })
        .catch(err => next(err))
    },

    // show form login
    signin: (req, res) => {
        res.render('auth/login')
    },

    // login user
    login: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),

    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/login')
    },

    home: (req, res) => {
        res.render('layouts/dashboard', req.user.dataValues)
    }

>>>>>>> b94474a0cd0d93c9d24f1f9d8ae5454c43925805
}