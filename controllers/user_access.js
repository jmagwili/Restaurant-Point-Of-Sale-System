const express = require('express')
const db = require('../database')
const userAccessRoute = express.Router()

userAccessRoute.get('/', (req,res) => {
    res.render('test')
})

module.exports = userAccessRoute