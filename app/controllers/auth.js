// const {roles} = require('../config/roles')
// const User = require('../models/usergame')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt-nodejs')

// exports.grantAccess = function (action, resource) {
//     return async(req, res, next) => {
//         try {
//             const permission = roles.can(req.user.role)[action](resource)
//             if (!permission.granted) {
//                 return res.status(401).json({
//                     error : "You don't have enough permission"
//                 })
//             }
//             next()
//         } catch (error) {
//             next(error)
//         }
//     }
// }

// exports.allowIfLoggedin = async (req, res, next) => {
//     try {
//         const user = res.locals.loggedInUser
//         if (!user) {
//             return res.status(401).json({
//                 error: "You need to be logged in to access this route"
//             })
//             res.user = user
//             next()
//         }
//     } catch (error) {
//         next(error)
//     }
// }

// async function hashPassword(password) {
//     return await bcrypt.hash(password, 10)
// }

// async function validatePassword(plainPassword, hashedPassword) {
//     return await bcrypt.compare(plainPassword, hashedPassword)
// }

// exports.daftar = async(req, res, next) => {
//     try {
//         const {username, password, role } = req.body
//         const hashedPassword = await hashPassword(password)
//         const newUser = new User({ username, password: hashedPassword, role: role || 'PlayerUser' })
//         const accessToken = jwt.sign({ user_id: newUser._id }, process.env.JWT_SECRET, {expiresIn: "1d"})
//         newUser.accessToken = accessToken
//         await newUser.save()
//         res.json({
//             data: newUser,
//             accessToken
//         })
//     } catch (error) {
//         next(error)
//     }
// }

// exports.masuk = async(req, res, next) => {
//     try {
//         const {username, password} = req.body
//         const user = await User.findOne({username})
//         if(!user) return next(new Error('username does not exist'))
//         const validPassword = await validPassword(password, user.password)
//         if(!validPassword) return next(new Error("Password is not correct"))
//         const accessToken = jwt.sign({user_id:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
//         await User.findById(user._id, {accessToken})
//         res.status(200).json({
//             data: { username: user.username, role: user.role},
//             accessToken
//         })
//     } catch (error) {
//         next(error)
//     }
// }

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
}