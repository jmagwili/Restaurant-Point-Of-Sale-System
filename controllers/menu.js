express = require('express')

menuRoute = express.Router()

menuRoute.get('/', (req, res) => {
    res.render('index')
})

module.exports = menuRoute
