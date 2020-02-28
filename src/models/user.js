//Importando constante do "../database/index.js"
const mongoose  = require('../database/index');
const bcrypt    = require('bcryptjs');

//Criando schema das tabelas do banco de dados
const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true,
    },
    senha:{
        type: String,
        require: true,
        select: false,  //Quando executar um select na tabela o campo senha não vai aparecer
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
});


//Com a função "pre()" e o parâmetro "save", a gente consegue dizer para a API executar essa função quando for salvar o schema
UserSchema.pre('save', async function(next){

    //A constante "hash" vai receber a função bcrypt() para criptografar a senha com um tamanho de 10
    const hash = await bcrypt.hash(this.senha, 10);
    //A coluna "senha" no schema vai receber a senha já criptgrafada para salvar na tabela do banco de dados
    this.senha = hash;

    //Com o next() se essa função não terminar o ciclo de solicitação-reposta, ela deve pular para próxima função
    next();
});


//Criando constante do Model herdando a função do Mongoose para criação da tabela com o schema criado anteriormente
const User = mongoose.model('User', UserSchema);

module.exports = User;