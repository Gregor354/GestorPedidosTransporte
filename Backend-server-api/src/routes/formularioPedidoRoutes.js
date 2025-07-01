const express = require('express');
const router = express.Router();
const formularioPedidoController = require('../controllers/formularioPedidoController');
const verify = require('../middleware/auth');

router.get('/tipo-transporte', formularioPedidoController.getTipoTransporte);
router.post(
    '/insertar-pedido-transporte', 
    uploadPedidos.fields([
        { name: 'oficio_solicitud', maxCount: 1 },
        { name: 'seguro_riesgo', maxCount: 1 }
    ]),
    formularioPedidoController.insertarPedido);

module.exports = router;