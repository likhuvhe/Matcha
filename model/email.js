const express = require('express')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matchawtc2019@gmail.com',
    pass: 'matcha123'
  }
});

const confirmAccount = function(email, redirect){
    var mailOptions = {
        from: 'matchawtc2019@gmail.com',
        to: email,
        subject: 'Confirm your account',
        html: '<a href="../registerlogin/login.ejs"> click here to activate your acount </a>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {confirmAccount}
