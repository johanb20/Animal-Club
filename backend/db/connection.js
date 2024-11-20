// Importamos la librería de MySQL para conectarnos a la base de datos
const mysql = require('mysql2');

// Creamos la conexión a la base de datos con los datos de acceso
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'animalclub'
});

// Conectamos y verificamos si hay algún error
connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Exportamos la conexión para que se pueda usar en otros archivos
module.exports = connection;