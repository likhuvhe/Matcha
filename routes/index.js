const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db = require('../model/db')
const bcrypt = require('bcrypt')

const collection = 'users'
db.connect()

// const url = 'mongodb://localhot:27017/matcha' 

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/register', (req, res) => {
    res.render('./registerLogin/register')
})
router.get('/login', (req, res) => {
    res.render('./registerLogin/login')
})
router.post('/login', (req, res) => {
    res.redirect('/login')
})
router.post('/register', (req, res) => {
    let pass1 = bcrypt.hashSync(req.body.pwd, 10)
    let pass2 = bcrypt.hashSync(req.body.pwd1, 10)
    
    console.log(`'<br>'${pass2}`)
    console.log(`'<br>'${pass1}`)
    if (pass1 === pass2)
        console.log('we are the same')
    const user = req.body
    db.getDB().collection(collection).insertOne(user)
    res.send('Open your email and follow the instructions to verify your account. <p></p> <a href="/login">login</a>')
})

module.exports = router