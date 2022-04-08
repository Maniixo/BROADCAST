// nodeJS
var nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const urlencoderParser = bodyParser.urlencoded({extended: true});


app.post('/sendMails', urlencoderParser, function(req, res){
    for (const [key, value] of Object.entries(req.body)){

        //Get the email address from the object in the body
        mail = value;

        //Check to see if the loop got the message as a key from the body object.
        //If so, break because this loop sends the message to the email address in the value.
        //And if the key is message, then the loop will send a message to a wrong address which will then produce an error.
        if(key != 'message'){
            //The application will send to this email address.
            console.log(mail);

            //Sender email address and password to login in the nodemailJS
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                auth: {
                    //Enter your email and password here.
                    //These must be valid
                    user: 'example@gmail.com',
                    pass: 'password'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            //Mail information
            var mailOptions = {
                from: 'example@gmail.com',
                to: mail,
                subject: 'Sending Email using Node.js',
                text: req.body.message
            };

            //The line that sends the mail from the sender's emails address.
            //The console.log was for testing purposes
            transporter.sendMail(mailOptions, function(error, info){
                if (error)
                    console.log(error);
                else
                    console.log('Email sent: to ' + mail);
            });
        }
    }
});




app.listen(5100);
console.log("listning to Port 5100");