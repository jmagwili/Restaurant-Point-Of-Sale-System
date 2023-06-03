const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.listen(3000, () => console.log('listening at port 3000'))

app.get('/',(req, res) => {
    res.render('Login')
})


