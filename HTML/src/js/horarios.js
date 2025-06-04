// Datos de ejemplo para horarios
const sampleSubjects = ['Matemáticas', 'Español', 'Ciencias', 'Historia', 'Geografía', 'Inglés', 'Educación Física'];
const sampleTeachers = ['Prof. López', 'Prof. Martínez', 'Prof. Sánchez', 'Prof. García', 'Prof. Rodríguez'];

// Generar horario
document.getElementById('generate-schedule').addEventListener('click', function() {
    const grade = document.getElementById('grade-select').value;
    const group = document.getElementById('group-select').value;
    
    if (!grade || !group) {
        alert('Por favor seleccione un grado y un grupo');
        return;
    }
    
    generateSchedule(grade, group);
});

function generateSchedule(grade, group) {
    const scheduleContainer = document.querySelector('.schedule-container');
    scheduleContainer.innerHTML = '';
    
    // Crear tabla de horario
    const table = document.createElement('table');
    table.className = 'schedule-table';
    
    // Encabezados de días
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const hours = ['7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00'];
    
    const thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    
    // Celda vacía para la esquina
    headerRow.appendChild(document.createElement('th'));
    
    // Agregar días como encabezados
    days.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Cuerpo de la tabla
    const tbody = document.createElement('tbody');
    
    // Para cada hora, crear una fila
    hours.forEach((hour, hourIndex) => {
        const row = document.createElement('tr');
        
        // Agregar la hora como primera celda
        const timeCell = document.createElement('td');
        timeCell.textContent = hour;
        row.appendChild(timeCell);
        
        // Para cada día, agregar una celda con materia y profesor
        days.forEach(day => {
            const cell = document.createElement('td');
            
            // Seleccionar materia y profesor aleatorio (en un sistema real vendría de una base de datos)
            const randomSubject = sampleSubjects[Math.floor(Math.random() * sampleSubjects.length)];
            const randomTeacher = sampleTeachers[Math.floor(Math.random() * sampleTeachers.length)];
            
            cell.innerHTML = `
                <strong>${randomSubject}</strong><br>
                <em>${randomTeacher}</em>
            `;
            
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    scheduleContainer.appendChild(table);
    
    // Agregar título del horario
    const title = document.createElement('h3');
    title.textContent = `Horario ${grade}° ${group}`;
    scheduleContainer.insertBefore(title, table);
}
