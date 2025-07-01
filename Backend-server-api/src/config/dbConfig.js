const configLocalPedidos = {
  user: 'sa',
  password: '19378426',
  server: 'localhost',
  port: 1433,
  database: 'GESTION_PEDIDOS_TRANSPORTE', // Cambia según el controlador si es necesario
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

// const configLocalPedidos = {
//   user: 'sa',
//   password: '12345678',
//   server: 'localhost',
//   port: 1433,
//   database: 'GESTION_PEDIDOS_TRANSPORTE', 
//   options: {
//     encrypt: false,
//     trustServerCertificate: false,
//   },
// };
  
  
module.exports = { configLocalPedidos };