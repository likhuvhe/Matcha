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
    //console.log(toconfirm)
    db.getDB().collection('users').find({vkey:req.query.vkey}).toArray(function(err, result) {
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
    const username = req.body.username
    const password = req.body.pwd
    db.getDB().collection('users').find({username: username}).toArray(function(err, result){
        if (err) throw err;
        // console.log(result)
        if (result.length >= 1){
            if (result[0].verified === false){
                console.log('please Verify your account')
                res.redirect('/login')
            }
            else if (bcrypt.compareSync(password, result[0].password)){
                console.log('successfully Logged in')
                res.send('success log in')
            }
            else{
                console.log('invalid password')
                res.redirect('/login')
            }
        } else{
            console.log('invalid username')
            res.redirect('/login')
        }
    })
})
router.post('/register', (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const firstName = req.body.firstname
    const lastName = req.body.lastname 
    const password = req.body.pwd
    const vkey = mails.token
    const verified = Boolean(false)
    
    db.getDB().collection(collection).find({$or:[{username: username} , {email: email}]}).toArray(function(err, result) {
        if (err) throw err;
        if (result.length >= 1){
            console.log('username or email alredy exist!')
            res.json({result: false, message:'username or email alredy exist!'})
        }
        else{
            // res.json(regValid.validateEmail(email))
            // res.json(regValid.validateEmail(email).message)
            if( regValid.validateEmail(email).result === true && 
                regValid.validateUsername(username).result=== true &&
                regValid.validateFirstname(firstName).result === true &&
                regValid.validateLastname(lastName).result === true &&
                regValid.validatePassword(password).result === true &&
                regValid.matchPassword(password, req.body.pwd1).result === true)
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
                  res.json({fResult: true})
                  
            }
            else{
                if (regValid.validateEmail(email).result === false){
                    res.json(regValid.validateEmail(email))
                }else if(regValid.validateUsername(username).result=== false){
                    res.json(regValid.validateUsername(username))
                }else if(regValid.validateFirstname(firstName).result === false){console.log('where');
                    res.json(regValid.validateFirstname(firstName)); 
                }else if(regValid.validateLastname(lastName).result === false){console.log('here');
                    res.json(regValid.validateLastname(lastName)); 
                }else if (regValid.validatePassword(password).result === false){
                    res.json(regValid.validatePassword(password))
                }else{
                    res.json(regValid.matchPassword(password, req.body.pwd1))
                }
            }
        } 
    });
    // module.exports = username
})


module.exports = router