// Importamos Express para definir las rutas y la conexión de MySQL
const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Ruta para obtener todos los clientes
router.get('/', (req, res) => {
    connection.query('SELECT * FROM registro', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Ruta para crear un nuevo cliente
router.post('/', (req, res) => {
    const { nombre, apellido, telefono, direccion, mascota, servicio } = req.body;
    connection.query('INSERT INTO registro (nombre, apellido, telefono, direccion, mascota, servicio) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, telefono, direccion, mascota, servicio], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, nombre, apellido, telefono, direccion, mascota, servicio});
      });
    });

// Ruta para actualizar un cliente existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, direccion, mascota, servicio } = req.body;

    connection.query('UPDATE registro SET nombre = ?, apellido = ?, telefono = ?, direccion = ?, mascota = ?, servicio = ? WHERE id = ?', [nombre, apellido, telefono, direccion, mascota, servicio, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('cliente actualizado');
    });
});

// Ruta para eliminar un cliente por su ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM registro WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('cliente eliminado');
    });
});

// Exportamos las rutas para que sean accesibles desde el servidor
module.exports = router;