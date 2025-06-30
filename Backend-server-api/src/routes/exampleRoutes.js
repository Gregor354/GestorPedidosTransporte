const router = require('express').Router();
const verify = require('../middleware/auth');

// Ruta protegida
router.get('/protected', verify, (req, res) => {
  res.status(200).json({
    msg: 'Acceso concedido a la información protegida.'
  })
});

// Ruta pública
router.get('/public', (req, res) => {
  res.status(200).json({
    msg: 'Acceso concedido a la información pública.'
  })
 
});

module.exports = router;
