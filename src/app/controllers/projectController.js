const express           = require('express');
const authMiddleWare    = require('../middlewares/auth');

const Project           = require('../models/project');
const Task              = require('../models/task');

const router            = express.Router();


router.use(authMiddleWare);

//Rota para listar todos
router.get('/', async (req, res) => {
    res.send({ ok: true, user: req.userId });
});

//Rota para listar 1
router.get('/:projectId', async (req, res) => {
    res.send({ user: req.userId });
});

//Rota para criar
router.post('/', async (req, res) => {
    res.send({ user: req.userId });
});

//Rota para atualizar
router.put('/:projectId', async (req, res) => {
    res.send({ user: req.userId });
});

//Rota para deletar
router.delete('/:projectId', async (req, res) => {
    res.send({ user: req.userId });
});


module.exports = app => app.use('/projects', router);