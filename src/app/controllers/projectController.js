const express           = require('express');
const authMiddleWare    = require('../middlewares/auth');

const Project           = require('../models/project');
const Task              = require('../models/task');

const router            = express.Router();


router.use(authMiddleWare);

//Rota para listar todos
router.get('/', async (req, res) => {

    try {
        const projects = await Project.find().populate(['usuario' , 'tasks']);

        return res.send({ projects });

    } catch (error) {
        return res.status(400).send({ error: "Error ao carrega projetos" });
    }

});

//Rota para listar 1
router.get('/:projectId', async (req, res) => {

    try {
        const project = await Project.findById(req.params.projectId).populate(['usuario' , 'tasks']);

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: "Error ao carrega projeto" });
    }

});

//Rota para criar
router.post('/', async (req, res) => {

    const { titulo, descricao, tasks } = req.body;

    try {   
        //Esse "req.userId" vem do middleware de autenticação
        const project = await Project.create( { titulo, descricao, usuario: req.userId });


        /**
         * Criação de tarefa junto com criação de projeto
         * 
         * */
        //Utilizado Promise.all() para fazer o "project.save()" esperar a execução de todas as promises
        await Promise.all(tasks.map(async task => {
            const projectTask = new Task ({ ...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();


        return res.send({ project });

    } catch (error) {
        res.status(400).send({ error: "Erro ao criar o projeto" });
    }

});

//Rota para atualizar
router.put('/:projectId', async (req, res) => {

    try {
        const { titulo, descricao, tasks } = req.body;

        // O "new: true" significa que ele irá retornar o valor atualizado, o findByIdAndUpdate() não faz isso por padrão...
        const project = await Project.findByIdAndUpdate(req.params.projectId, { titulo, descricao }, { new: true });

        //Remove todas as tasks criadas depois que atualizar o project
        project.tasks = [];
        await Task.remove({ project: project._id });


        await Promise.all(tasks.map(async task => {
            const projectTask = new Task ({ ...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();


        return res.send({ project });


    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Erro ao atualizar o projeto" });
    }

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