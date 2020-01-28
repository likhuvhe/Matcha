const express = require('express')
var nodemailer = require('nodemailer');
const randomstring = require('randomstring')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matchawtc2019@gmail.com',
    pass: 'matcha123'
  }
});
const token = randomstring.generate()
const confirmAccount = function(email){
    var mailOptions = {
        from: 'matchawtc2019@gmail.com',
        to: email,
        subject: 'Confirm your account',
        html: '<a href=\"http://localhost:5000/login?vkey='+`${token}`+'"> click here to activate your acount </a>'
      };
      
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.erro(error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      
      });
}

const resetPassword = function(email){
  var mailOptions = {
      from: 'matchawtc2019@gmail.com',
      to: email,
      subject: 'Reset Matcha password',
      html: '<a href=\"http://localhost:5000/resetPwd?vkey='+`${token}`+'"> click here to reset your password </a>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

module.exports = {confirmAccount, token, resetPassword}