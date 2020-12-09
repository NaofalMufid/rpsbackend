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

}