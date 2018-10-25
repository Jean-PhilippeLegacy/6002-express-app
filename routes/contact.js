var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact Page',msg: ''});
});

router.post('/send', function(req, res, next) {
  const output = `
    <h1>Happy ${req.body.holiday} ${req.body.to}! from ${req.body.from}</h1>`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'plurjlkmff3pdf7s@ethereal.email',
          pass: 'HCP9cDYzrdhNNt88gE'
      }
  });
  
      // setup email data with unicode symbols
      let mailOptions = {
          from: 'Node Express App', // sender address
          to: req.body.email, // list of receivers
          subject: 'Greetings from Express App', // Subject line
          html: output // html body
      };
  
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      });

      res.render('preview', {title:'Email Preview',from: req.body.from, to: req.body.to, holiday: req.body.holiday, email:req.body.email});

});



module.exports = router;