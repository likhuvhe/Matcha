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
    db.getDB().collection('users').find({vkey:req.query.vkey}).toArray(function(err, result) {
        if (err) throw err;
        if (result.length >= 1){
            db.getDB().collection('users').updateOne(
                { _id: result[0]._id},
                { $set:
                    {
                        verified: true,
                        vkey: ''
                    }
                })
            res.redirect('http://localhost:3000/login')
        } else{
            console.log('invalid token')
            res.send('invalid token')
        }
    })
})

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.pwd
    db.getDB().collection('users').find({username: username}).toArray(function(err, result){
        if (err) throw err;
        if (result.length >= 1){
            
            if (result[0].verified === false && bcrypt.compareSync(password, result[0].password)){
                console.log('please Verify your account')
                res.json({result: false, message: 'please Verify your account'})
            }else if (bcrypt.compareSync(password, result[0].password)){
                console.log('successfully Logged in')
                console.log(req.session.userId = result[0]._id);
                res.json({result:true})
            }else{
                console.log('invalid password')
                res.json({result: false, message:'invalid password'})
            }
        } else{
            console.log('username not found')
            res.json({result: false, message: 'username not registered'})
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
        }else{
            if( regValid.validateEmail(email).result === true && 
                regValid.validateUsername(username).result=== true &&
                regValid.validateFirstname(firstName).result === true &&
                regValid.validateLastname(lastName).result === true &&
                regValid.validatePassword(password).result === true &&
                regValid.matchPassword(password, req.body.pwd1).result === true){
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
                    db.getDB().collection(collection).find({username: username}).toArray(function(err, result) {
                        if (err) throw err;
                        req.session.userId = result[0]._id
                    })
                    mails.confirmAccount(email)
                });
                  console.log('successfuly registered')
                  res.json({fResult: true})
                  
            }else{
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
})

router.post('/forgetPwd', (req, res) => {
    const email = req.body.email
    const vkey = mails.token;
    db.getDB().collection(collection).find({email: email}).toArray(function(err, result) {
        if (err) throw err;
        if (result.length > 0){
            db.getDB().collection('users').updateOne(
                { _id: result[0]._id},
                { $set:
                    {
                        vkey: vkey
                    }
                })
            mails.resetPassword(email)
        }else{
            console.log("Email address is not registered")
        }

    })
})

router.get('/resetPwd', (req, res) => {
    db.getDB().collection('users').find({vkey:req.query.vkey}).toArray(function(err, result) {
                if (err) throw err;
                if (result.length >= 1){
                    res.redirect(`http://localhost:3000/forgetPassword/resetPwd?vkey=${req.query.vkey}`)
                } else{
                    console.log('invalid token')
                    res.send('invalid token')
                }
            })
})

router.post('/resetPwd', (req, res) => {
    const password = req.body.password;
    const confirmPass = req.body.confirmPass;
    db.getDB().collection('users').find({vkey:req.body.token}).toArray(function(err, result) {
        if (err) throw err;
        if (result.length >= 1){
            if (regValid.validatePassword(password).result === true &&
                regValid.matchPassword(password, confirmPass).result === true){
                bcrypt.hash(password, saltRounds, function(err, hash){
                    db.getDB().collection('users').updateOne(
                        { _id: result[0]._id},
                        { $set:
                            {
                                password: hash,
                                vkey: ''
                            }
                        })
                })
                res.json({result: true})
            }else{
                if (regValid.validatePassword(password).result === false){
                    res.json(regValid.validatePassword(password).message)
                }else{
                    res.json(regValid.matchPassword(password, req.body.pwd1).message)
                }
            }
        }else{
            res.json(`You already reset your password <a href="http://localhost:3000/login">click here to login with new password</a>`)
        }
    })
})
router.post('/userProfile', (req, res) =>{

    const ssid = req.session.userId
     console.log(ssid)
        db.getDB().collection('users').find({id: undefined}).toArray(function(err, result) {
            if (err) throw err;
            if (result.length){
                console.log(result)
            }
        })  
    res.redirect('http://localhost:3000/userProfile')
})

module.exports = router