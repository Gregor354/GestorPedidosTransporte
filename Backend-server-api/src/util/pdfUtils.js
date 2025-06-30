const fs = require('fs').promises;

async function readPDF(fileName) {
  try {
    const data = await fs.readFile(`D:/sgd-uni/archivostramite/${fileName}`); // Lee el archivo PDF desde el directorio pdfs
    return data;
  } catch (error) {
    console.error(`Error al leer el archivo PDF: ${error.message}`);
    throw error;
  }
}

module.exports = { readPDF };