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

userAccessRoute.post('/update-record', (req,res) => {
    console.log(req.body)
    let query = "UPDATE users SET user_password=?, hasMenuAccess=?, hasOrdersAccess=?, hasSalesAccess=? WHERE userID=?"
    try{
        db.query(query, (err,results)=>{
            console.log(results)
            res.send('Record Successfully Updated')
        })
    }catch(err){
        console.log(err)
    }
})

module.exports = userAccessRoute