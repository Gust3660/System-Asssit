// Función para mostrar fecha y hora actual
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    document.getElementById('current-date').textContent = now.toLocaleDateString('es-ES', options);
    document.getElementById('current-time').textContent = now.toLocaleTimeString('es-ES');
    
    // Actualizar año en el footer
    document.getElementById('current-year').textContent = now.getFullYear();
}

// Actualizar cada segundo
setInterval(updateDateTime, 1000);
updateDateTime(); // Llamada inicial

// Navegación entre secciones
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obtener el ID de la sección a mostrar
        const sectionId = this.getAttribute('href');
        
        // Ocultar todas las secciones
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active-section');
        });
        
        // Mostrar la sección seleccionada
        document.querySelector(sectionId).classList.add('active-section');
        
        // Actualizar navegación activa
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        this.classList.add('active');
    });
});

// Manejo del modal
const modal = document.getElementById('student-modal');
const closeModal = document.querySelector('.close-modal');

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Datos de ejemplo (estos vendrían de una API de base de datos)
const sampleGrades = ['1°', '2°', '3°', '4°', '5°', '6°'];
const sampleGroups = ['A', 'B', 'C', 'D'];

// Llenar selects con datos de ejemplo
function populateSelects() {
    const gradeSelects = document.querySelectorAll('select[id$="-grade"]');
    const groupSelects = document.querySelectorAll('select[id$="-group"]');
    
    gradeSelects.forEach(select => {
        sampleGrades.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade;
            select.appendChild(option);
        });
    });
    
    groupSelects.forEach(select => {
        sampleGroups.forEach(group => {
            const option = document.createElement('option');
            option.value = group;
            option.textContent = group;
            select.appendChild(option);
        });
    });
}

document.addEventListener('DOMContentLoaded', populateSelects);
