const express = require('express')
 
const validateFirstname = function(firstName)
{
    name = firstName.trim()
    if (name.trim() === '')
    {
        console.log('Error: firstName empty')
        
        // return false
        return({result: false, message: 'first Name empty'})
    }
    let regExp = /^[a-zA-Z]{1,50}$/
    if (regExp.test(firstName)){
        console.log('valid first name')
        // return true;
        return({result: true})
    }
    else{
        err = 'invalid first Name'
        console.log('invalid first Name')
        // return false
        return({result:false, message:'invalid first Name'})
    }
}
const validateLastname = function(lastName)
{
    name = lastName.trim()
    if (name === '')
    {
        
        console.log('Error: Last Name empty')
        console.log('            +++++++++')
        // return false
        return({result:false, message:'last Name empty'})
    }
    let regExp = /^[a-zA-Z]{1,50}$/
    if (regExp.test(lastName)){
        console.log('valid Last name')
        // return true;
        return({result:true})
    }
    else{
        console.log('invalid last name')
        // return false
        console.log('also get here')
        return({result:false, message:'invalid last Name'})
    }
}
const validateUsername = function(userName)
{
    name = userName.trim()
    if (name === '')
    {
        
        console.log('Error: User Name empty')
        // return false
        return({result:false, message:'empty user Name'})
    }
    let regExp = /^(?=.{4,10})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/
    if (regExp.test(userName)){
        console.log('valid user name')
        // return true;
        return({result:true})
    }
    else{
        console.log('invalid user name')
        // return false
        return({result:false, message:'invalid user Name'})
    }
}
const validateEmail = function(email)
{
    email1 = email.trim()
    if (email1 === '')
    {
        
        console.log('Error: Email empty')
        // return false
        res = {result: false, message: 'empty email'}
        return res
    }
    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regExp.test(email)){
        console.log('valid Email')
        const res = {result: true, message: 'valid email'}
        //  return true;
        return res
    }
    else{
        res = {result: false, message: 'invalid email'}
        console.log('invalid Email')
        // return false
        return res
    }
}

const validatePassword = function(password)
{
    password1 = password.trim()
    if (password1 === '')
    { 
        console.log('Error: password empty')
        // return false
        return({result:false, message:'empty password'})
    }
    let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)(?=.{4,}).*$/
    if (regExp.test(password)){
        console.log('valid password')
        // return true;
        return({result:true})
    }
    else{
        console.log('invalid password')
        // return false
        return({result:false, message:'invalid password'})
    }
}
const matchPassword = function(pass1, pass2) 
{
   if (pass1 === pass2)
   {
       console.log('passord matched')
       return({result:true})
    //    return true
   }
   else{
    console.log('passord do not match')
    return({result:false, message:'password do not match'})
    // return false
   }
}
module.exports = {validateFirstname, validateLastname, validateUsername, validateEmail, validatePassword, matchPassword}

