var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.render('contact');
});

/* Email Sender: Used in POST request server side */
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const auth = {
    auth: {
        api_key: '',
        domain: ''
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));
const sendMail = (name, email, subject, text, cb) => {
    const mailOptions = {
        sender: name,
        from: email,
        to: 'samyallal2@gmail.com',
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            try{ cb(err, null)}catch (e){}
            // cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/* Router: render page, sendMail: to send email */
module.exports = {sendMail: sendMail, router: router};
