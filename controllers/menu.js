const express = require('express')
const db = require('../database')
const bodyParser = require('body-parser')
menuRoute = express.Router()

menuRoute.use(bodyParser.urlencoded({extended: true}))
menuRoute.use(bodyParser.json())

let menu

function getMenu() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products';
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
  
  menuRoute.get('/', async (req, res) => {
    try {
      const menu = await getMenu();
      res.render('index', { menu });
    } catch (error) {
      console.log(error);
      res.render('index', { menu: [] }); // Render with an empty menu or handle the error accordingly
    }
  });

menuRoute.post('/', (req, res) =>{
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
