const express = require('express')
const session = require('express-session');
const menuRoute = require('./controllers/menu')
const orderRoute = require('./controllers/orders')
const userAccessRoute = require('./controllers/user_access')
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
app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
    })
);

module.exports.checkAuthentication = (req, res, next) => {
    // Check if user is authenticated
    if (req.session.isAuthenticated) {
      // User is authenticated, proceed to the dashboard
      return next();
    }
    res.redirect('/');
}

//routes
app.use('/menu', menuRoute)
app.use('/orders', orderRoute)
app.use('/user-access',this.checkAuthentication, userAccessRoute)

app.get('/',(req, res) => {
    req.session.destroy()
    res.render('Login')
})

app.post('/', async (req, res) => {
    const query = 'SELECT * FROM users WHERE user_id = ? AND user_password = ?'
    const access = db.query(query, [req.body.email,req.body.password],(err, results) => {  
        if(results.length === 1){
            req.session.isAuthenticated = true
            req.session.username = req.body.email
            res.redirect('/menu')
        }else{
            res.redirect('/')          
        }
    })
})

app.listen(3000, () => console.log('listening at port 3000'))