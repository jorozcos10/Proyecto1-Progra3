// register.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Aquí podrías enviar los datos del formulario a un servidor si es necesario

        // Mostrar el mensaje de éxito
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';

        // Redirigir después de 2 segundos (simulación de éxito)
        setTimeout(function() {
            window.location.href = 'index.html'; // Redireccionar a index.html
        }, 2000); // 2000 milisegundos = 2 segundos
    });
});
