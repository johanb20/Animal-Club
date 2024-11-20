//Modal
const botonesCitas = document.querySelectorAll('.boton-citas');
const modal = document.getElementById('modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close');

// Mostrar el modal y la capa oscura cuando se haga clic en cualquier botón
botonesCitas.forEach(boton => {
    boton.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'flex';
        overlay.style.display = 'block'; 
    });
});

// Cerrar el modal y la capa oscura al hacer clic en el botón de cerrar
close.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

// Cerrar el modal y la capa oscura al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === modal || event.target === overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
});
