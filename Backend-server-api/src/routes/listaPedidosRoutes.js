const express = require('express');
const router = express.Router();
const listaPedidosController = require('../controllers/listaPedidosController');
//const verify = require('../middleware/auth');

router.get('/lista-pedidos', listaPedidosController.getListaPedidos);
router.get('/lista-itinerario', listaPedidosController.getListaItinerario);

module.exports = router;