// Definimos la URL de la API
const apiUrl = 'http://localhost:3000/clientes';

// Cargamos clientes al cargar la página
document.addEventListener('DOMContentLoaded', cargarCliente);

// Función para obtener y mostrar los clientes en la tabla
async function cargarCliente() {
    const response = await fetch(apiUrl); // Hacemos la solicitud a la API
    const clientes = await response.json(); // Convertimos la respuesta en JSON
    const tbody = document.querySelector('#clientesTable tbody');
    tbody.innerHTML = ''; // Limpiamos la tabla antes de llenarla

    // Recorremos los clientes y creamos una fila para cada uno
    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td><input type="text" value="${cliente.nombre}" id="nombre-${cliente.id}"></td>
            <td><input type="text" value="${cliente.apellido}" id="apellido-${cliente.id}"></td>
            <td><input type="number" value="${cliente.telefono}" id="telefono-${cliente.id}"></td>
            <td><input type="text" value="${cliente.direccion}" id="direccion-${cliente.id}"></td>
            <td><input type="text" value="${cliente.mascota}" id="mascota-${cliente.id}"></td>
            <td>
                <select id="servicio-${cliente.id}">
                    <option value="consulta-general" ${cliente.servicio === "consulta-general" ? "selected" : ""}>Consulta General</option>
                    <option value="consulta-domiciliaria" ${cliente.servicio === "consulta-domiciliaria" ? "selected" : ""}>Consulta Domiciliaria</option>
                    <option value="atencion-urgencias" ${cliente.servicio === "atencion-urgencias" ? "selected" : ""}>Atención de Urgencias</option>
                    <option value="hospitalizacion-24h" ${cliente.servicio === "hospitalizacion-24h" ? "selected" : ""}>Hospitalización 24 horas</option>
                    <option value="laboratorio-clinico" ${cliente.servicio === "laboratorio-clinico" ? "selected" : ""}>Laboratorio Clínico Diagnóstico</option>
                    <option value="rayos-x-ecografia" ${cliente.servicio === "rayos-x-ecografia" ? "selected" : ""}>Rayos X y Ecografía</option>
                    <option value="cirugia-ortopedica" ${cliente.servicio === "cirugia-ortopedica" ? "selected" : ""}>Cirugía Ortopédica</option>
                    <option value="cirugia-general" ${cliente.servicio === "cirugia-general" ? "selected" : ""}>Cirugía General y Especializada</option>
                    <option value="vacunacion" ${cliente.servicio === "vacunacion" ? "selected" : ""}>Vacunación</option>
                    <option value="desparasitacion" ${cliente.servicio === "desparasitacion" ? "selected" : ""}>Desparasitación</option>
                    <option value="spa-canino-felino" ${cliente.servicio === "spa-canino-felino" ? "selected" : ""}>Spa Canino y Felino</option>
                    <option value="guarderia" ${cliente.servicio === "guarderia" ? "selected" : ""}>Guardería</option>
                </select>
            </td>
            <td>
                <button onclick="actualizarCliente(${cliente.id})">Actualizar</button>
                <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr); // Agregamos la fila a la tabla
    });
}

// Función para agregar un nuevo cliente
document.querySelector('#clienteForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitamos que el formulario recargue la página
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const mascota = document.getElementById('mascota').value;
    const servicio = document.getElementById('servicio').value;

    // Hacemos la solicitud POST para crear un cliente
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, telefono, direccion, mascota, servicio })
    });
    cargarCliente(); // Recargamos la lista de clientes
});

// Función para actualizar un cliente
async function actualizarCliente(id) {
    // Obtener los valores actuales de los campos de la fila
    const nombre = document.getElementById(`nombre-${id}`).value;
    const apellido = document.getElementById(`apellido-${id}`).value;
    const telefono = document.getElementById(`telefono-${id}`).value;
    const direccion = document.getElementById(`direccion-${id}`).value;
    const mascota = document.getElementById(`mascota-${id}`).value;
    const servicio = document.getElementById(`servicio-${id}`).value;

    // Verificar que los valores obtenidos son los esperados
    console.log({ nombre, apellido, telefono, direccion, mascota, servicio });

    // Enviar la solicitud PUT con los nuevos datos
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, telefono, direccion, mascota, servicio })
    });

    // Recargar los clientes después de la actualización
    cargarCliente();
}


// Función para eliminar un cliente
async function eliminarCliente(id) {
    // Hacemos la solicitud DELETE para eliminar el cliente
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    cargarCliente(); // Recargamos la lista de clientes
}