import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'jaygupta7655@gmail.com',
        pass: 'rmexhvzlyfvmvnhi'
    }
})

const mailOptions = {
    from: 'jaygupta7655@gmail.com',
    to: '',
    subject: '',
    text: ''
}


const sendMail = async (to, subject, text) => {
    mailOptions['to'] = to;
    mailOptions['subject'] = subject;
    mailOptions['text'] = text;
console.log(sendMail,"sendmail--------");
    await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log("Error occured:",err);
        }
        else {
            console.log(info);
        }
    })
}

export default sendMail;