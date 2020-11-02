const createError = require('http-errors')
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require("cors")
const PORT = process.env.PORT || 8080
const app = express()

// var corsOptions = {
//     origin: "http://localhost:8080"
// }

app.use(cors())

const db = require("./app/models")
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.")
})

// set ejs for view engine
app.set('view engine', 'ejs')

// set public folder for styling ejs
app.use(express.static(__dirname + '/public'));

// parser
app.use(logger('dev'))

// parse request of content-type - application/json
app.use(cookieParser())
app.use(bodyParser.json())

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// include user api router
require("./app/routes/api.routes")(app)
// include user web router
require("./app/routes/web.routes")(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('errors/error');
  });

// listen request
app.listen(PORT, () =>{
    console.log(`Server runing on http://localhost:${PORT}`)
})
