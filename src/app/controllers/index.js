/**
 * 
 * Classe criada para evitar necessidade de declarar rotas
 * passando o "app" no "index.js" principal. A parti de agora
 * todos os arquivos de controller dentro da pasta "controllers"
 * terão acesso ao "app".
 * 
 */
const fs    = require('fs'); //Para trabalhar com File System
const path  = require('path'); //Para trabalhar com caminho de pastas

module.exports = app => {
    fs
    .readdirSync(__dirname)
    //Selecionando todos os arquivos da pasta em que não começam com "." e que não tenha o nome de "index.js"
    .filter(file => ((file.indexOf('.') !== 0 && (file !== "index.js"))))
    //Atribui a cada um desses arquivos o (app)
    .forEach(file => require(path.resolve(__dirname, file))(app));
}