const express = require('express')
const db = require('../database')
const userAccessRoute = express.Router()

let usersData

function getUserData(){
    try{
        db.query("SELECT * FROM users", (err, results) => {
            console.log(results)
            usersData = results    
        })
    }catch(err){
        console.log(err)
    }
}

userAccessRoute.get('/', (req,res) => {
    getUserData()
    res.render('test', {usersData})
})

module.exports = userAccessRoute