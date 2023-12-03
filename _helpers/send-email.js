const nodemailer = require('nodemailer');
const cors = require('cors');
const config = require('config.json');

app.use(cors());
module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail({ from, to, subject, html });
}