const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJWt = require('passport-jwt').ExtractJwt

// load up the user model
const UserGames = require('../models').userGame

module.exports = function (passport) {
    const opts = {
        jwtFromRequest: ExtractJWt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: 'nodeauthsecret',
    }
    passport.use('jwt', new JwtStrategy(opts, function (jwt_payload, done) {
        UserGames
        .findByPk(jwt_payload.id)
        .then((user) => { return done(null, user) })
        .catch((error) => { return done(error, false) })
    }))
}