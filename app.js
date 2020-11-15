const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const session = require('express-session')
const flash = require('express-flash')
const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())

// set public folder for styling ejs
app.use(express.static(__dirname + '/public'));

// parse request of content-type - application/json
app.use(cookieParser())
app.use(bodyParser.json())

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// session handler
app.use(session({
    secret: 'ajaomongomong',
    resave: false,
    saveUninitialized: false
}))

// passport local middleware
const passport_local = require('./app/lib/passport_local')
app.use(passport_local.initialize())
app.use(passport_local.session())

// passport jwt
const passport = require('./app/lib/passport')
app.use(passport.initialize())

// flash
app.use(flash())

// set ejs for view engine
app.set('view engine', 'ejs')

// include user api router
require("./app/routes/api.routes")(app)
// include user web router
const router = require("./app/routes/web.routes")
app.use(router)

// listen request
app.listen(PORT, () =>{
    console.log(`Server runing on http://localhost:${PORT}`)
})