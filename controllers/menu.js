express = require('express')

menuRoute = express.Router()

menuRoute.get('/', (req, res) => {
    res.send('hello')
})

module.exports = menuRoute
