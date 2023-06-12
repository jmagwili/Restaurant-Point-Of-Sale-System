const express = require('express')
const db = require('../database')
const orderRoute = express.Router()

orderRoute.get('/', (req, res) => {
    res.render('orders',{username: req.session.username})
})

orderRoute.post('/', (req, res) =>{
    console.log(req.body)
    res.send('request received')
    console.log('post request received')
})

module.exports = orderRoute
