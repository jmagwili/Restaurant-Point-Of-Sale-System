const express = require('express')
const db = require('../database')
const bodyParser = require('body-parser')
menuRoute = express.Router()

menuRoute.use(bodyParser.urlencoded({extended: true}))
menuRoute.use(bodyParser.json())

let menu

function getMenu(){
    try{
        const query = 'SELECT * FROM products'
        db.query(query, (err, results) => {
            menu = results
        })
    }catch(e){
        console.log(e)
    }
}

menuRoute.get('/', async (req, res) => {
    await getMenu()  
    res.render('index', {menu})
})

module.exports = menuRoute
