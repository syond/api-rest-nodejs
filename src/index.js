const express       = require('express');
const bodyParser    = require('body-parser');

const app = express();

//Para que a API entenda quando eu enviar informações via JSON
app.use(bodyParser.json());
//Para que a API entenda quando eu passar parâmetros via URL
app.use(bodyParser.urlencoded({ extended: false }));

//Declarando o controler na parte principal da API e enviando a constante "app" para ser utilizada dentro do controller. 
require('./app/controllers/index')(app);

app.listen(3000);