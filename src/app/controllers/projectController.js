const express           = require('express');
const authMiddleWare    = require('../middlewares/auth');

const Project           = require('../models/project');
const Task              = require('../models/task');

const router            = express.Router();


router.use(authMiddleWare);

//Rota para listar todos
router.get('/', async (req, res) => {

    try {
        const projects = await Project.find().populate('usuario');

        return res.send({ projects });

    } catch (error) {
        return res.status(400).send({ error: "Error ao carrega projetos" });
    }

});

//Rota para listar 1
router.get('/:projectId', async (req, res) => {

    try {
        const project = await Project.findById(req.params.projectId).populate('usuario');

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: "Error ao carrega projeto" });
    }

});

//Rota para criar
router.post('/', async (req, res) => {

    const { titulo } = req.body;

    try {
        //Verificar: Não consegue cadastrar mesmo nome utilizando usuário diferente. Talvez tenha que testar o ID do usuário também. 
        if(await Project.findOne({ titulo }))
            return res.status(400).send({ error: "Projeto já cadastrado" });
    
        //Esse "req.userId" vem do middleware de autenticação
        const project = await Project.create( { ...req.body, usuario: req.userId });

        return res.send({ project });

    } catch (error) {
        res.status(400).send({ error: "Erro ao criar o projeto" });
    }

});

//Rota para atualizar - TODO
router.put('/:projectId', async (req, res) => {
    res.send({ user: req.userId });
});

//Rota para deletar
router.delete('/:projectId', async (req, res) => {

    try {
        await Project.findByIdAndRemove(req.params.projectId);

        return res.send({ msg: "Projeto removido com sucesso" });

    } catch (error) {
        return res.status(400).send({ error: "Error ao carrega projeto" });
    }

});


module.exports = app => app.use('/projects', router);