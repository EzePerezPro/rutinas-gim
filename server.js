const express = require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const app = express();

app.get('/download-pdf', (req, res) => {
  // Crear un nuevo documento PDF
  const doc = new PDFDocument();

  // Establecer las cabeceras para descargar el archivo PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

  // Pipe del documento a la respuesta
  doc.pipe(res);

  // Agregar contenido al PDF
  doc.fontSize(16).text('Hola, esto es un PDF generado con pdfkit');
  doc.fontSize(14).text('Este es otro párrafo');

  // Finalizar el documento
  doc.end();
});

// Iniciar el servidor en el puerto 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
