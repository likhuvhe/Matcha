const express = require('express')
const session = require('express-session')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const indexRouter = require('./routes/index')
const db = require('./model/db')
db.connect()

const {
    PORT = 5000,
    SESS_NAME = 'sid',
    NODE_ENV = 'development'

} = process.env;

const IN_PROD = NODE_ENV === 'production'

app.set('view engine', 'ejs')
app.set('views',__dirname + '/views') // set the path
app.set('layout', 'layouts/layout')

app.use(session({
    name: SESS_NAME,
    secret: 'any string',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: IN_PROD,
    }
}))
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', indexRouter);

app.listen(PORT, (err) => console.log(`server is running at port ${PORT}`))

module.exports = SESS_NAME;