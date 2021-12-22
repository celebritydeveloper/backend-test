"use strict"
const ejs = require('ejs');

const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");



const buildHTML = (path, data = {})=>{
    return new Promise((resolve, reject) => {
        ejs.renderFile(`views/emails/${path}.ejs`, data, async (err, html) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(html)
            }
        })
    })
}

const sendEmailSES = ({email, html, title, sender}) => {
    return new Promise((resolve,reject) => {
        try {
            const transporter = nodemailer.createTransport(
                smtpTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // use TLS
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.EMAIL_PASS,
                    },
                })
            );

            
            
            let mailOptions = {
                from: sender,
                to: email,
                subject: title,
                html: html
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error)
                  console.log(error);
                } else {
                    resolve()
                  console.log("Email sent: " + info.response);
                }
            });
        } catch (err) {
            resolve()
        }
    })
}

class Emails {
    static sendEmail({path, data, email, title, sender = '"Backend Test" <noreply@backendtest.com>'}) {
        return new Promise(async(resolve, reject) => {
            try {
                let html = await buildHTML(path, data);
                await sendEmailSES({
                    email,
                    html,
                    title,
                    sender
                });
                resolve()
            } catch (err) {
                resolve();
            }
        });
    }
}

module.exports = Emails;