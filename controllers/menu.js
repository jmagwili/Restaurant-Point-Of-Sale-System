express = require('express')
menuRoute = express.Router()

menuRoute.get('/', (req, res) => {
    res.render('index', {username: req.session.username})
})

module.exports = menuRoute
