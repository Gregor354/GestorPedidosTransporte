const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Authorization header:", authHeader); // Log the header

  if (!authHeader) {
    return res.status(401).json({ msg: 'Acceso denegado. No se encontró el token.' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token received:", token); // Log the token
  if (!token) {
    return res.status(403).json({ msg: 'Token is missing' });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified; // Almacena la información del usuario en req.user
    next(); // Llama al siguiente middleware o ruta
  } catch (error) {
    console.log("Token verification failed:", error.message); // Log the error
    return res.status(401).json({ msg: 'Token inválido.' });
  }
};

module.exports = verifyToken;
