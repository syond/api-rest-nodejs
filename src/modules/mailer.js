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

  /**  ESSE CÓDIGO NÃO ESTÁ FUNCIONANDO, PRECISA VERIFICAR
   * Link para o repositório da lib: https://github.com/yads/nodemailer-express-handlebars/issues/26
   * 
   * transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('../src/resources/mail/'), //Caminho onde ficam os templates de email
    partialsDir: path.resolve(__dirname, "../resources"),
    extName: '.html',
}));
   * 
   */



module.exports = transport;