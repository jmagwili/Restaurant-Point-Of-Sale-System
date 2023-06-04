const express = require('express')
const menuRoute = require('./controllers/menu')
const orderRoute = require('./controllers/orders')
const db = require('./database')
const bodyParser = require('body-parser')
const app = express()

//middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

//routes
app.use('/menu', menuRoute)
app.use('/orders', orderRoute)

app.get('/',(req, res) => {
    res.render('Login')
})

app.post('/', async (req, res) => {
    const access = db.query('SELECT * FROM users WHERE user_id = ? AND user_password = ?', [req.body.email,req.body.password],(err, results) => {  
        if(results.length === 1){
            res.redirect('/menu')
        }else{
            res.redirect('/')          
        }
    })
})

app.listen(3000, () => console.log('listening at port 3000'))