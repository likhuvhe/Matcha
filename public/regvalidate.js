const express = require('express')

let collection = 'users' 


const validateFirstname = function(firstName)
{
    name = firstName.trim()
    if (name.trim() === '')
    {
        console.log('Error: firstName empty')
        return false
    }
    let regExp = /^[a-zA-Z]{1,50}$/
    if (regExp.test(firstName)){
        console.log('valid first name')
        return true;
    }
    else{
        console.log('invalid first Name')
        return false
    }
}
const validateLastname = function(lastName)
{
    name = lastName.trim()
    if (name === '')
    {
        
        console.log('Error: Last Name empty')
        return false
    }
    let regExp = /^[a-zA-Z]{1,50}$/
    if (regExp.test(lastName)){
        console.log('valid Last name')
        return true;
    }
    else{
        console.log('invalid last name')
        return false
    }
}
const validateUsername = function(userName)
{
    name = userName.trim()
    if (name === '')
    {
        
        console.log('Error: User Name empty')
        return false
    }
    let regExp = /^(?=.{4,10})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/
    if (regExp.test(userName)){
        console.log('valid user name')
        return true;
    }
    else{
        console.log('invalid user name')
        return false
    }
}
const validateEmail = function(email)
{
    email1 = email.trim()
    if (email1 === '')
    {
        
        console.log('Error: Email empty')
        return false
    }
    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regExp.test(email)){
        console.log('valid Email')
        return true;
    }
    else{
        console.log('invalid Email')
        return false
    }
}

const validatePassword = function(password)
{
    password1 = password.trim()
    if (password1 === '')
    { 
        console.log('Error: password empty')
        return false
    }
    let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)(?=.{4,}).*$/
    if (regExp.test(password)){
        console.log('valid password')
        return true;
    }
    else{
        console.log('invalid password')
        return false
    }
}
const matchPassword = function(pass1, pass2) 
{
   if (pass1 === pass2)
   {
       console.log('passord matched')
       return true
   }
   else{
    console.log('passord do not match')
    return false
   }
}
// ^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$


module.exports = {validateFirstname, validateLastname, validateUsername, validateEmail, validatePassword, matchPassword}

