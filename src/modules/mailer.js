const nodemailer                    = require('nodemailer');
//A gente vai usar o hbs para preencher variáveis dentro de arquivo HTML, como o nome dos destinatários dos emails...
const hbs                           = require('nodemailer-express-handlebars');
const path                          = require('path');
const { host, port, user, pass }    = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
  });


/**
 * 
 * Implementado de acordo com a issue do NodeMailer
 * https://github.com/yads/nodemailer-express-handlebars/issues/22
 * 
 */
const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./resources/mail/'),
    layoutsDir: path.resolve('./resources/mail/auth/'),
    defaultLayout: 'forgot_password.html',
  },
  viewPath: path.resolve('./resources/mail/'),
  extName: '.html',
};

transport.use('compile', hbs(handlebarOptions));



module.exports = transport;