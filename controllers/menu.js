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

menuRoute.post('/', (req, res) =>{
    // console.log(req.body)
    console.log('post request received')
    
    let query = "INSERT INTO orders(order_details) VALUE ('"+ JSON.stringify(req.body) +"')"
    // let queryValues = ""
    // for(let i = 0; i <= req.body.length - 1; i++){
    //     queryValues = queryValues + "(name='"+req.body[i].name+"', qty="+req.body[i].qty+", amt="+req.body[i].amt+")"
    //     if(i < req.body.length - 1){
    //         queryValues = queryValues + ", "
    //     }
    // }
    // query = query + queryValues
    db.query(query)
})

module.exports = menuRoute
