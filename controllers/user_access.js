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

userAccessRoute.post('/update', (req,res) => {
    let username = req.body.userid
    let password = req.body.password
    let hasMenuAccess = req.body.hasMenuAccess
    let hasOrdersAccess = req.body.hasOrdersAccess
    let hasSalesAccess = req.body.hasSalesAccess
    
    let query = "UPDATE users SET user_password=?, hasMenuAccess=?, hasOrdersAccess=?, hasSalesAccess=? WHERE user_ID=?"
   
    try{
        db.query(query, [password,hasMenuAccess,hasOrdersAccess,hasSalesAccess,username], (err,results)=>{
            console.log(results)
            res.send('Record Successfully Updated').status(200)
        })
    }catch(err){
        console.log(err)
    }
})

userAccessRoute.post('/add', (req,res) => {
    
    let username = req.body.userid
    let password = req.body.password
    let hasMenuAccess = req.body.hasMenuAccess
    let hasOrdersAccess = req.body.hasOrdersAccess
    let hasSalesAccess = req.body.hasSalesAccess

    console.log(req.body)

    let verifyQuery = "SELECT * FROM users WHERE user_ID=?"
    let insertQuery = "INSERT INTO users (user_id, user_password, hasMenuAccess, hasOrdersAccess, hasSalesAccess, hasUsersAccess) VALUES (?,?, ?, ?, ?, 1);"
    
    db.query(verifyQuery, [username], (err, results) => {
        if(results.length === 0){
            console.log('request received')
            db.query(insertQuery, [username,password,hasMenuAccess,hasOrdersAccess,hasSalesAccess], (err,results) => {
                console.log(results)
            })
        }else{
            console.log('failed to execute')
        }
    })
})

userAccessRoute.post('/delete', (req,res) => {
    let username = req.body.userid

    let query = "DELETE FROM users WHERE user_ID=?"

    db.query(query, [username], (err,results) => {
        console.log(results)
    })
})

module.exports = userAccessRoute