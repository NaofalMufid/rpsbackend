const passport_local = require('passport')
const LocalStrategy = require('passport-local')
const {User} = require('../models')

// authenctication
async function authenticate(username, password, done) {
    try {
        const user = await User.authenticate({ username, password })
        return done(null, user)
    } catch (error) {
        return done(null, false, {message: error.message})
    }
}

passport_local.use(
    new LocalStrategy({ useranemField: 'username', passwordField: 'password' }, authenticate)
)

passport_local.serializeUser(
    (user, done) => done(null, user.id)
)

passport_local.deserializeUser(
    async(id, done) => done(null, await User.findByPk(id))
)

module.exports = passport_local