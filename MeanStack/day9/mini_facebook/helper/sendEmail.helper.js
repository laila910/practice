const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'li0693942@gmail.com',
        pass: '123@Tech'
    }
});




const sendEmail = (email, text) => {
    mailOptions = {
        from: 'JLRM site',
        to: email,
        subject: 'welcome to Our Site',
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success register :) ');
    })
};
module.exports = sendEmail