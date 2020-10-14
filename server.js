const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const PORT = process.env.PORT || 8080
const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

const db = require("./app/models")
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.")
// })

// handle request from form
// app.use(
//     express.urlencoded({
//         extended: false
//     })
// )

// set ejs for view engine
app.set('view engine', 'ejs')

// set public folder for styling ejs
app.use(express.static(__dirname + '/public'));

// parse request of content-type - application/json
app.use(bodyParser.json())

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// landing route
// app.get("/", (req, res) => {
//     res.render('auth/login')
// })

// include user api router
require("./app/routes/api.routes")(app)
// include user web router
require("./app/routes/web.routes")(app)

// listen request
app.listen(PORT, () =>{
    console.log(`Server runing on http://localhost:${PORT}`)
})
