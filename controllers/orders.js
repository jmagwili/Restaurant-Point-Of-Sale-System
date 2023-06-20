const express = require('express')
const db = require('../database')
const orderRoute = express.Router()

let orders

function getOrders(){
    try{
        const query = 'SELECT order_details FROM orders'
        db.query(query, (err, results) => {
            orders = results
            console.log(orders.length)
           console.log(orders[0].order_details[0].name) 
        })
    }catch(e){
        console.log(e)
    }
}

orderRoute.get('/', (req, res) => {
    getOrders()
    console.log(JSON.stringify(orders))
    res.render('orders', {orders})
})

orderRoute.post('/', (req, res) =>{
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
    console.log(query)
})

module.exports = orderRoute
