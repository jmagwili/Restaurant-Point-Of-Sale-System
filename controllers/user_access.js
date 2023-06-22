const express = require('express')
const db = require('../database')
const userAccessRoute = express.Router()

let usersData
let userSearch

function getUserData(){
    try{
        db.query("SELECT * FROM users", (err, results) => {
            // console.log(results)
            usersData = results    
        })
    }catch(err){
        console.log(err)
    }
}

function searchUser(userID){
    try{
        db.query("SELECT * FROM users WHERE user_ID = '" +userID+"'", (err, results) =>  {
            userSearch = results
            console.log(results)
        })
    }catch(err){
        console.log(err)
    }
}

userAccessRoute.get('/', (req,res) => {
    getUserData()
    res.render('test', {usersData})
})

userAccessRoute.post('/', (req,res) => {
    searchUser(req.body.userid)
    console.log('request received')
    res.send({userSearch})
})

module.exports = userAccessRoute