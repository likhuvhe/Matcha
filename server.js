const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const db = require('./model/db')
const collection = 'users'
db.connect()
/*------------------------------------------*/
//initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'I am flash message',
    resave: true,
    saveUninitialized: true,
}))
//initialise flash middleware
app.use(flash())
/*------------------------------------------*/

app.set('view engine', 'ejs')
app.set('views',__dirname + '/views') // set the path
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter)

app.listen(5000, (err) => console.log('server is running at port 5000'))