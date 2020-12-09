const passport = require ('passport' )
const { Strategy : JwtStrategy, ExtractJwt } = require ('passport-jwt' )
const model = require('../models')
const User = model.User

const options = {
    jwtFromRequest : ExtractJwt .fromHeader ('authorization' ),
    secretOrKey : 'cukupkitayangtahu' ,
}
passport.use(new JwtStrategy (options, async (payload, done) => {
    User.findByPk (payload .id)
    .then(user => done(null, user))
    .catch(err => done(err, false))
}))

module.exports = passport
