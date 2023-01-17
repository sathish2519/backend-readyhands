const nodemailer = require('nodemailer');

exports.generateOTP = (OTP_length = 6) => {

    let OTP = '';
    for (let i = 1; i <= OTP_length; i++) {
        const randomval = (Math.round(Math.random() * 9))
        OTP += randomval;
    }
    return OTP;

}


exports.generateMailTransporter=()=> nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});