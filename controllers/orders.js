const express = require('express')
const db = require('../database')
const orderRoute = express.Router()

let orders

function getOrders(){
    try{
        const query = 'SELECT * FROM orders'
        db.query(query, (err, results) => {
            orders = results
        //     console.log(orders.length)
        //    console.log(orders[0].order_details[0].name) 
        })
    }catch(e){
        console.log(e)
    }
}

orderRoute.get('/', (req, res) => {
    getOrders()
    // console.log(JSON.stringify(orders))
    res.render('orders', {orders})
})

orderRoute.post('/cancel', (req,res)=>{
    console.log('Delete request received')
    console.log(req.body.deleteOrder)
    db.query("DELETE FROM orders where order_id = " + req.body.deleteOrder, (result => {
        console.log(result)
    }))
    res.redirect('/orders')
})

module.exports = orderRoute
