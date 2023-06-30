const express = require('express')
const db = require('../database')
const orderRoute = express.Router()

function getOrders(){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM orders';
        db.query(query, (err, results) => {
          if(err){
            reject(err);
          }else{
            resolve(results);
          }
        });
      });
}

orderRoute.get('/', async (req, res) => {
    try {
        const orders = await getOrders()
        res.render('orders', {orders})
      } catch (err) {
        console.log(err)
        res.render('orders', {orders:[]})
      }
    });

orderRoute.post('/cancel', (req,res)=>{
    console.log('Delete request received')
    console.log(req.body.deleteOrder)
    db.query("DELETE FROM orders where order_id = " + req.body.deleteOrder, (result => {
        console.log(result)
    }))
    res.redirect('/orders')
})

module.exports = orderRoute
