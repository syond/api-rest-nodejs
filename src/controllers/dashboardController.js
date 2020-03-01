/**
 * 
 * Classe para teste de autenticação com Token.
 * O usuário precisará estar autenticado com um Token válido para acessar essa rota.
 * 
 */

const express           = require('express');
const router            = express.Router();
const authMiddleware    = require('../middlewares/auth');


router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ ok: true, user: req.userId });
});


module.exports = app => app.use('/dashboard', router);