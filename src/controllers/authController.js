const express   = require('express');
const User      = require('../models/User');
const router    = express.Router(); //Constante para criar Rotas
const bcrypt    = require('bcryptjs');


//Rota para chamar o cadastro de usuário.
router.post('/cadastrar', async(req, res) => {

    //Pegando o email digitado pelo usuário
    const { email } = req.body;

    try {
        //Testando se o email já está cadastrado
        if(await User.findOne({ email })){
            
            return res.status(400).send({ error: "Email já cadastrado" });

        } else{

            //Pega todos os parâmetros salvos no REQ e envia para o Model User que envia para o Mongoose
            //Utilizando o "await" da função "async()" para fazer o sistema esperar essa função ser executada para depois continuar
            const user = await User.create(req.body);

            //Aqui estou dizendo para deixar a senha "undefinied" para quando imprimir os dados a senha não aparecer.
            user.senha = undefined;

            //Retornando usuário cadastrado
            return res.send({ user });

        }

    } catch (err) {
        
        //Retorna mensagem de erro com status 400
        return res.status(400).send({ error: 'Houve um erro!' });

    }

});


//Rota para fazer autenticação
router.post('/autenticar', async(req, res) => {

    //Pegando o email e a senha digitados
    const { email, senha } = req.body;

    //Instanciando User e selecionando apatir do email, a senha está dentro do select porque foi configurada para "select: false" no Model
    const user = await User.findOne({ email }).select('+senha');

    //Teste para verificar se o usuário existe
    if(!user)
        return res.status(400).send({ error: 'O usuário não existe!' });
    

    //Teste para verificar se a senha digitada está correta
    if(!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({ error: 'Dados inválidos!' });
    

    res.send({ user });
});

//Dessa forma conseguimos utilizar o router dentro da API com um prefixo "/auth" no link
module.exports = app => app.use('/auth', router);