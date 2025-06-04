document.addEventListener('DOMContentLoaded', function() {
    // Actualizar fecha y hora
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        };
        document.getElementById('currentDateTime').textContent = now.toLocaleDateString('es-ES', options);
    }
    
    // Actualizar cada segundo
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Navegación entre secciones
    const sections = {
        btnDashboard: 'dashboard',
        btnAsistencia: 'asistencia',
        btnReportes: 'reportes',
        btnPerfil: 'perfil'
    };
    
    // Configurar eventos de navegación
    Object.keys(sections).forEach(btnId => {
        document.getElementById(btnId).addEventListener('click', function() {
            // Ocultar todas las secciones
            document.querySelectorAll('section').forEach(section => {
                section.classList.add('hidden-section');
                section.classList.remove('active-section');
            });
            
            // Mostrar la sección correspondiente
            const sectionId = sections[btnId];
            document.getElementById(sectionId).classList.remove('hidden-section');
            document.getElementById(sectionId).classList.add('active-section');
            
            // Actualizar botones activos
            document.querySelectorAll('.top-bar button').forEach(button => {
                button.classList.remove('active');
            });
            this.classList.add('active');
            
            // Si es la sección de reportes, generar gráficos
            if (sectionId === 'reportes') {
                generarReportes();
            }
        });
    });
    
    // Cambiar imagen de perfil
    document.getElementById('btnChangeImage').addEventListener('click', function() {
        document.getElementById('profileImageInput').click();
    });
    
    document.getElementById('profileImageInput').addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                document.getElementById('profileImage').src = event.target.result;
                
                // Opcional: Guardar en localStorage para persistencia
                localStorage.setItem('profileImage', event.target.result);
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Cargar imagen de perfil guardada (si existe)
    if (localStorage.getItem('profileImage')) {
        document.getElementById('profileImage').src = localStorage.getItem('profileImage');
    }
    
    // Inicializar gráficos del dashboard
    inicializarDashboardCharts();
    
    // Simular datos de alumnos para la sección de asistencia
    cargarDatosAsistencia();
    
    // Configurar botón guardar asistencia
    document.getElementById('btnGuardarAsistencia').addEventListener('click', function() {
        const materia = document.getElementById('selectMateria').value;
        const grupo = document.getElementById('selectGrupo').value;
        
        if (!materia || !grupo) {
            alert('Por favor seleccione una materia y un grupo');
            return;
        }
        
        // Aquí iría la lógica para guardar en una base de datos de MYSQL Server
        alert('Asistencia guardada correctamente para ' + materia + ' - ' + grupo);
    });
    
    // Configurar botón guardar perfil
    document.getElementById('btnGuardarPerfil').addEventListener('click', function() {
        const nombre = document.getElementById('profileNombre').value;
        const email = document.getElementById('profileEmail').value;
        const telefono = document.getElementById('profileTelefono').value;
        
        // Validación básica
        if (!nombre || !email) {
            alert('Nombre y correo electrónico son obligatorios');
            return;
        }
        
        // Aquí iría la lógica para guardar en una base de datos de MYSQL Server
        alert('Perfil actualizado correctamente');
    });
    
    // Configurar botón generar reporte
    document.getElementById('btnGenerarReporte').addEventListener('click', function() {
        generarReportes();
    });
    
    // Actualizar círculos de progreso
    actualizarCirculosProgreso();
});

function inicializarDashboardCharts() {
    // Gráfico de asistencia por materia
    const materiaCtx = document.getElementById('materiaChart').getContext('2d');
    new Chart(materiaCtx, {
        type: 'bar',
        data: {
            labels: ['Matemáticas', 'Ciencias', 'Historia', 'Literatura'],
            datasets: [{
                label: 'Porcentaje de Asistencia',
                data: [85, 78, 92, 80],
                backgroundColor: [
                    'rgba(46, 125, 50, 0.7)',
                    'rgba(96, 173, 94, 0.7)',
                    'rgba(0, 80, 5, 0.7)',
                    'rgba(76, 175, 80, 0.7)'
                ],
                borderColor: [
                    'rgba(46, 125, 50, 1)',
                    'rgba(96, 173, 94, 1)',
                    'rgba(0, 80, 5, 1)',
                    'rgba(76, 175, 80, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Porcentaje (%)'
                    }
                }
            }
        }
    });
    
    // Gráfico de asistencia mensual
    const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(monthlyCtx, {
        type: 'line',
        data: {
            labels: ['Ene 2025', 'Feb 2025', 'Mar 2025', 'Abr 2025', 'May 2025', 'Jun 2025'],
            datasets: [{
                label: 'Asistencia Mensual',
                data: [82, 85, 88, 87, 90, 85],
                fill: false,
                backgroundColor: 'rgba(46, 125, 50, 0.7)',
                borderColor: 'rgba(46, 125, 50, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Porcentaje (%)'
                    }
                }
            }
        }
    });
}

function cargarDatosAsistencia() {
    const alumnos = [
        { id: 1, nombre: 'Juan Pérez' },
        { id: 2, nombre: 'María Gómez' },
        { id: 3, nombre: 'Carlos Ruiz' },
        { id: 4, nombre: 'Ana López' },
        { id: 5, nombre: 'Pedro Martínez' }
    ];
    
    const tableBody = document.getElementById('attendanceTableBody');
    tableBody.innerHTML = '';
    
    alumnos.forEach(alumno => {
        const row = document.createElement('tr');
        
        const cellNombre = document.createElement('td');
        cellNombre.textContent = alumno.nombre;
        row.appendChild(cellNombre);
        
        const cellAsistencia = document.createElement('td');
        const select = document.createElement('select');
        select.innerHTML = `
            <option value="presente">Presente</option>
            <option value="ausente">Ausente</option>
            <option value="justificado">Justificado</option>
            <option value="tardanza">Tardanza</option>
        `;
        cellAsistencia.appendChild(select);
        row.appendChild(cellAsistencia);
        
        const cellHora = document.createElement('td');
        const now = new Date();
        cellHora.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        row.appendChild(cellHora);
        
        tableBody.appendChild(row);
    });
}

function generarReportes() {
    // Datos simulados para el reporte
    const reportData = [
        { alumno: 'Juan Pérez', materia: 'Matemáticas', fecha: '10/06/2025', hora: '08:15', asistencia: 'Presente' },
        { alumno: 'María Gómez', materia: 'Ciencias', fecha: '10/06/2025', hora: '09:30', asistencia: 'Presente' },
        { alumno: 'Carlos Ruiz', materia: 'Historia', fecha: '09/06/2025', hora: '14:00', asistencia: 'Ausente' },
        { alumno: 'Ana López', materia: 'Matemáticas', fecha: '08/06/2025', hora: '08:15', asistencia: 'Tardanza' },
        { alumno: 'Pedro Martínez', materia: 'Literatura', fecha: '07/06/2025', hora: '11:45', asistencia: 'Presente' },
        { alumno: 'Luisa Fernández', materia: 'Ciencias', fecha: '05/06/2025', hora: '09:30', asistencia: 'Justificado' },
        { alumno: 'Jorge Domínguez', materia: 'Historia', fecha: '04/06/2025', hora: '14:00', asistencia: 'Presente' },
        { alumno: 'Sofía Ramírez', materia: 'Literatura', fecha: '03/06/2025', hora: '11:45', asistencia: 'Ausente' }
    ];
    
    // Aplicar filtros
    const materia = document.getElementById('reportMateria').value;
    const grupo = 'todos'; // Simulación de grupo, se puede cambiar según necesidad
    const fechaInicio = new Date(document.getElementById('reportFechaInicio').value);
    const fechaFin = new Date(document.getElementById('reportFechaFin').value);
    
    let filteredData = reportData;
    
    // Filtrar por materia si no es "todas"
    if (materia !== 'todas') {
        filteredData = filteredData.filter(item => item.materia.toLowerCase() === materia.toLowerCase());
    }
    
    // Filtrar por fechas
    filteredData = filteredData.filter(item => {
        const partesFecha = item.fecha.split('/');
        const fechaItem = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
        return fechaItem >= fechaInicio && fechaItem <= fechaFin;
    });
    
    // Llenar tabla de detalle
    const detailedBody = document.getElementById('detailedReportBody');
    detailedBody.innerHTML = '';
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.alumno}</td>
            <td>${item.materia}</td>
            <td>${item.fecha}</td>
            <td>${item.hora}</td>
            <td class="${getAsistenciaClass(item.asistencia)}">${item.asistencia}</td>
        `;
        
        detailedBody.appendChild(row);
    });
    
    // Calcular estadísticas para el gráfico
    const conteoAsistencias = {
        Presente: 0,
        Ausente: 0,
        Justificado: 0,
        Tardanza: 0
    };
    
    filteredData.forEach(item => {
        conteoAsistencias[item.asistencia] = (conteoAsistencias[item.asistencia] || 0) + 1;
    });
    
    // Gráfico de asistencia por alumno
    const studentCtx = document.getElementById('studentChart').getContext('2d');
    
    // Destruir gráfico anterior si existe
    if (window.studentChart) {
        window.studentChart.destroy();
    }
    
    window.studentChart = new Chart(studentCtx, {
        type: 'doughnut',
        data: {
            labels: ['Presente', 'Ausente', 'Justificado', 'Tardanza'],
            datasets: [{
                data: [
                    conteoAsistencias.Presente,
                    conteoAsistencias.Ausente,
                    conteoAsistencias.Justificado,
                    conteoAsistencias.Tardanza
                ],
                backgroundColor: [
                    'rgba(46, 125, 50, 0.7)',
                    'rgba(244, 67, 54, 0.7)',
                    'rgba(33, 150, 243, 0.7)',
                    'rgba(255, 152, 0, 0.7)'
                ],
                borderColor: [
                    'rgba(46, 125, 50, 1)',
                    'rgba(244, 67, 54, 1)',
                    'rgba(33, 150, 243, 1)',
                    'rgba(255, 152, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Distribución de Asistencias'
                }
            }
        }
    });
}

function getAsistenciaClass(asistencia) {
    switch(asistencia.toLowerCase()) {
        case 'presente': return 'asistencia-presente';
        case 'ausente': return 'asistencia-ausente';
        case 'justificado': return 'asistencia-justificada';
        case 'tardanza': return 'asistencia-tardanza';
        default: return '';
    }
}

function actualizarCirculosProgreso() {
    document.querySelectorAll('.circular-progress').forEach(progress => {
        const percent = progress.getAttribute('data-percent');
        const fill = progress.querySelector('.progress-circle-fill');
        
        // Calcular el stroke-dashoffset basado en el porcentaje
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (percent / 100) * circumference;
        
        fill.style.strokeDashoffset = offset;
        
        // Actualizar el texto
        progress.querySelector('.progress-text').textContent = `${percent}%`;
        
        // Actualizar variable CSS
        progress.style.setProperty('--percent', percent);
    });
}
