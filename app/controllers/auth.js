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