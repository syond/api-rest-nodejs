/**
 * 
 * Classe middleware que será utilizada para autenticação de usuário.
 * As etapas de validação de token poderiam ser feitas utilizando somente o JWT,
 * mas farei algumas etapas de validação simples antes de utilizar o JWT
 * para poupar recursos de processamento.
 * 
 */

const jwt           = require('jsonwebtoken');
const authConfig    = require('../config/auth.json');

module.exports = (req, res, next) => {
    
    //Capturando requisição Authorization do Header do interpretador HTTP
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: "Nenhum token fornecido" });

    
        /**
         * O padrão do token é vir algo como " Baerer 890248c91ab4fe4940fce9dc2bdbf6b9  "
         * Com o split(" ") conseguimos separar o "Baerer" do hash
         */
        const parts = authHeader.split(" ");

    

    if(!parts.length === 2)
        return res.status(401).send({ error: "Token error" });

        //Estamos guardando a palavra "Baerer" na variável "schema" e o Token na variável "token"
        const [ schema, token ] = parts;
        

    //Rejex testando o "scheme" para verificar se o token começa com "Baerer"
    if(!/^Baerer$/i.test(schema))
        return res.status(401).send({ error: "Token malformatted" });

        /**
         * Agora sim vamos utilizar o JWT.
         * "decoded" recebe o id do usuário.
         * */
        jwt.verify(token, authConfig.secret, (err, decoded) => {

            if(err){

                return res.status(401).send({ error: "Token inválido" });

            } else{
                req.userId = decoded.id;
                return next();
            }
        });
    
        

    
}