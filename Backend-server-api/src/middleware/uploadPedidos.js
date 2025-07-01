const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/pedidos/')); // Ajusta la ruta según tu estructura
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadPedidos = multer({ storage: storage });

module.exports = uploadPedidos;