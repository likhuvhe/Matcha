const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const mails = require('../model/email')
const db = require('../model/db')

// const emails = require('./model/email')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const regValid = require('../public/regvalidate')

const collection = 'users'
db.connect()

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/register', (req, res) => {
    res.render('./registerLogin/register')
})
router.get('/login', (req, res) => {
    // const toconfirm = req.query.vkey
    console.log(toconfirm)
    db.getDB().collection(collection).find({vkey:req.query.vkey}).toArray(function(err, result) {
        if (err) throw err;
        // console.log(result)
        if (result.length >= 1){
            db.getDB().collection('users').update(
                { _id: result[0]._id},
                { $set:
                    {
                        verified: true,
                        vkey: ''
                    }
                })
        } else{
            console.log('invalid token')
        }
    })
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
    const vkey = mails.token
    const verified = Boolean(false)
    console.log(verified)
    
    db.getDB().collection(collection).find({$or:[{username: username} , {email: email}]}).toArray(function(err, result) {
        if (err) throw err;
        if (result.length >= 1){
            console.log('username or email alredy exist!')
            res.redirect('/register')
        }
        else{
            if( regValid.validateEmail(email) && 
                regValid.validateUsername(username) &&
                regValid.validateFirstname(firstName) &&
                regValid.validateLastname(lastName) &&
                regValid.validatePassword(password) &&
                regValid.matchPassword(password, req.body.pwd1))
            {
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    const user = {
                        username: username,
                        email: email,
                        firstname: firstName,
                        lastname: lastName,
                        password: hash,
                        vkey: vkey,
                        verified: verified
                    }
                    db.getDB().collection(collection).insertOne(user)
                    mails.confirmAccount(email)
                });
                  console.log('successfuly registered')
                  res.redirect('/register')
                  
            }else{
                res.redirect('/register')
            }
        } 
    });
})
// router.get('/login', (req, res) => {
//     console.log(req.query.vkey)
// })

module.exports = router