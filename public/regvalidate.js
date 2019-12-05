const express = require('express')
const flash = require('express-flash')
//validators
const validateFirstname = function(firstName){
    //check empty
    if (firstName === ''){
        flash(info, 'Please enter ${firstName}')
        return;
    } 
    else{
        console.log('#fffff')
        return true
    }
    //check only letters
    // if (checkOnlyLetters(firstName)) return;
}

module.exports = {validateFirstname}

