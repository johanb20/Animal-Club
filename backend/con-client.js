const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5500;

// Middleware para procesar datos enviados desde formularios HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'animalclub'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Ruta para guardar los datos enviados desde el formulario
app.post('/enviar-datos', (req, res) => {
  console.log(req.body);

  // Extraer los datos enviados desde el formulario
  const { nombre, apellido, telefono, direccion, mascota, servi } = req.body;

  // Verifica que todos los datos requeridos estén presentes
  if (!nombre || !apellido || !telefono || !direccion || !mascota || !servi) {
    return res.status(400).send('Por favor, completa todos los campos del formulario.');
  }

  // Crear la consulta para insertar los datos en la base de datos
  const query = `
    INSERT INTO registro (nombre, apellido, telefono, direccion, mascota, servicio)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // Ejecutar la consulta
  connection.query(query, [nombre, apellido, telefono, direccion, mascota, servi], (err, result) => {
    if (err) {
      console.error('Error al insertar datos:', err);
      return res.status(500).send('Error al guardar los datos en la base de datos.');
    }
    res.send('Datos guardados correctamente.');
  });
});

// Ruta para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando.');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});