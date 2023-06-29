const express = require('express')
const db = require('../database')
const bodyParser = require('body-parser')
menuRoute = express.Router()

menuRoute.use(bodyParser.urlencoded({extended: true}))
menuRoute.use(bodyParser.json())

function getImages() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT product_image FROM products';
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        const base64Images = results.map((row) => {
          if (row.product_image !== null) {
            return row.product_image.toString('base64');
          } else {
            return null;
          }
        });
        resolve(base64Images.filter((image) => image !== null));
      }
    });
  });
}
  
function getMenu() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
      if(err){
        reject(err);
      }else{
          const menuWithBase64Images = results.map((item) => {
          const base64Image = item.product_image ? item.product_image.toString('base64') : null;
          return { ...item, product_image: base64Image };
        });
        resolve(menuWithBase64Images);
      }
    });
  });
}


  menuRoute.get('/', async (req, res) => {
    try {
      const menu = await getMenu()
      const images = await getImages()
      console.log({menu,images})
      res.render('index', {menu,images})
    } catch (err) {
      console.log(err)
      res.render('index', {menu:[]})
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
