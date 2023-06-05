const express = require('express')
const db = require('../database')
const orderRoute = express.Router()

orderRoute.get('/', (req, res) => {
    res.render('orders',{username: req.session.username})
})

module.exports = orderRoute
