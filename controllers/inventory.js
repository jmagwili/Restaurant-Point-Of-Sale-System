const express = require('express')
const db = require('../database')
const inventoryRoute = express.Router()

inventoryRoute.get('/',(req,res)=>{
    res.render('inventory')
})

module.exports = inventoryRoute