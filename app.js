var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var index = require('./routes/index');
var team = require('./routes/team');
var contact = require('./routes/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/team', team);
app.use('/contact', contact);

app.post('/send', (req,res) => {
  // console.log(req.body);
  const output = `
    <h1>${req.body.fname} ${req.body.lname} has sent you a message.</h1>
    <p>${req.body.message}</p>`;

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
          from: '"Fred Foo 👻" <plurjlkmff3pdf7s@ethereal.email', // sender address
          to: req.body.email, // list of receivers
          subject: 'Hello ✔', // Subject line
          html: output // html body
      };
  
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });

      res.render('preview', { output:output, email:req.body.email});
});

module.exports = app;
