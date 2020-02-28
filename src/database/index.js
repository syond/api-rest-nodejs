const mongoose = require('mongoose');

//Função que conecta o MongoDB. "/noderest" é o nome do banco de dados.
mongoose.connect('mongodb://127.0.0.1/noderest', { useNewUrlParser: true, useUnifiedTopology: true });
//Isso aqui é padrão do Mongoose
mongoose.Promise = global.Promise;

//Exportando a constante para que possa ser referenciada em qualquer lugar do projeto
module.exports = mongoose;
