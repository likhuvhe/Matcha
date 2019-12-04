const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db = require('../model/db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    const email = req.body.email
    const username = req.body.username
    const firstName = req.body.firstname
    const lastName = req.body.lastname 
    const password = req.body.pwd

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const user = {
            username: username,
            email: email,
            firstname: firstName,
            lastname: lastName,
            password: hash
        }
        db.getDB().collection(collection).insertOne(user)
      });
    res.send('Open your email and follow the instructions to verify your account. <p></p> <a href="/login">login</a>')
})

module.exports = router