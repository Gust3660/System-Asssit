document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');
    const loginMessage = document.getElementById('login-message');
    const currentTimeElement = document.getElementById('current-time');
    const currentDateElement = document.getElementById('current-date');

    // Credenciales válidas
    const validCredentials = {
        username: 'admin',
        password: '123'
    };

    // Cargar datos guardados
    loadSavedData();

    // Mostrar/ocultar contraseña
    togglePassword.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.src = "img/eye-open.png";
            eyeIcon.alt = "Ocultar contraseña";
        } else {
            passwordInput.type = "password";
            eyeIcon.src = "img/eye-closed.png";
            eyeIcon.alt = "Mostrar contraseña";
        }
    });

    // Validar el login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        // Guardar datos antes de validar
        saveData(username);
        
        if (username === validCredentials.username && password === validCredentials.password) {
            showMessage('Credenciales correctas. Redirigiendo...', 'success');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1500);
        } else {
            showMessage('Credenciales incorrectas', 'error');
        }
    });

    // Función para mostrar mensajes
    function showMessage(message, type) {
        loginMessage.textContent = message;
        loginMessage.className = 'login-message ' + type;
    }

    // Función para guardar datos en localStorage
    function saveData(username) {
        localStorage.setItem('savedUsername', username);
    }

    // Función para cargar datos guardados
    function loadSavedData() {
        const savedUsername = localStorage.getItem('savedUsername');
        if (savedUsername) {
            usernameInput.value = savedUsername;
            passwordInput.focus();
        }
    }

    // Actualizar hora y fecha
    function updateDateTime() {
        const now = new Date();
        
        // Formatear hora
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const timeString = `${hours}:${minutes} ${ampm}`;
        
        // Formatear fecha
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const dayName = days[now.getDay()];
        const dateString = `${dayName}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
        
        currentTimeElement.textContent = timeString;
        currentDateElement.textContent = dateString;
    }

    // Iniciar reloj
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function updateCopyrightYear() {
    const year = new Date().getFullYear();
    document.getElementById("current-year").textContent = year;
}
