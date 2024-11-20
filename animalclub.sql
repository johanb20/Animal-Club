CREATE DATABASE animalclub;
USE animalclub;

CREATE TABLE registro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    mascota VARCHAR(100) NOT NULL,
    servicio VARCHAR(100) NOT NULL
);
