const express = require('express');
const router = express.Router();
const formularioPedidoController = require('../controllers/formularioPedidoController');
const verify = require('../middleware/auth');

router.get('/tipo-transporte', formularioPedidoController.getTipoTransporte);

module.exports = router;