const express       = require('express');
const User          = require('../models/User');
const router        = express.Router(); //Constante para criar Rotas
const bcrypt        = require('bcryptjs');
const jwt           = require('jsonwebtoken');
const authConfig    = require('../../config/auth.json'); //Constate que importar as configurações para o token
const crypto        = require('crypto');
const mailer        = require('../../modules/mailer');


//Função para gerar token ao se autenticar
function generateToken(params = {}){
    
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, //Definindo em quanto tempo o token expira, 86400 segundos = 1 dia
    });

};


//Rota para chamar o cadastro de usuário.
router.post('/register', async(req, res) => {

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
            return res.send({ 
                user, 
                token: generateToken({ id: user.id }), 
            });

        }

    } catch (err) {
        
        //Retorna mensagem de erro com status 400
        return res.status(400).send({ error: 'Houve um erro!' });

    }

});


//Rota para fazer autenticação
router.post('/authenticate', async(req, res) => {

    //Pegando o email e a senha digitados
    const { email, senha } = req.body;

    //Instanciando User e selecionando apatir do email, a senha está dentro do select porque foi configurada para "select: false" no Model
    const user = await User.findOne({ email }).select('+senha');

    //Teste para verificar se o usuário existe
    if(!user){

        return res.status(400).send({ error: 'O usuário não existe!' });

    } else{}
        

    //Teste para verificar se a senha digitada está correta
    if(!await bcrypt.compare(senha, user.senha)){

        return res.status(400).send({ error: 'Dados inválidos!' });

    } else{}

    //Expliquei o motivo disso aqui logo acima
    user.senha = undefined;

    res.send({ 
        user, 
        token: generateToken({ id: user.id }), 
    });
});


router.post('/forgot_password', async(req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if(!user)
            return res.status(400).send({ error: "Usuário não encontrado" });


        //Gerando token em Hexadecimal
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        //Definindo tempo de experição do Token, no caso a hora atual + 1 = 1 hora a mais
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'apirestnodejs@syond.com',
            template: 'auth/forgot_password',
            subject: 'Reset de senha API Rest',
            context: { token },
        }, (err) => {
            if(err)
                return res.status(400).send({ error: "Não foi possível enviar o email para reset de senha" });
            
            return res.send(200);
        });

    
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error no reset de senha, tente novamente" });
    }
});

//Dessa forma conseguimos utilizar o router dentro da API com um prefixo "/auth" no link
module.exports = app => app.use('/auth', router);