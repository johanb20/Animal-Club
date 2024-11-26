// Importamos Express para crear el servidor, CORS para manejar las peticiones y rutas personalizadas
const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientes'); // Rutas para clientes
const app = express(); // Inicializamos la aplicación Express

// Configuramos CORS para permitir peticiones desde otro origen (necesario para frontend-backend)
app.use(cors());

// Configuramos el servidor para que acepte JSON en el cuerpo de las solicitudes
app.use(express.json());

// Montamos las rutas de clientes en el path '/clientes'
app.use('/clientes', clientesRoutes);

// Configuramos el puerto en el que se ejecutará el servidor
const PORT = 3000;

// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});