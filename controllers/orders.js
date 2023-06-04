const express = require('express')
const db = require('../database')
const orderRoute = express.Router()

orderRoute.get('/', (req, res) => {
    res.render('orders')
})

module.exports = orderRoute
