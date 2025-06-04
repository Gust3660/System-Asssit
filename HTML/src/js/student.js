// Se puede conectar con una base de datos real o simular una base de datos localmente
const studentData = {
    name: "Juan Pérez García",
    id: "A01234567",
    attendance: [
        {
            subject: "Matemáticas",
            period: "2025-1",
            totalClasses: 20,
            attended: 18,
            missed: 2
        },
        {
            subject: "Historia",
            period: "2025-1",
            totalClasses: 15,
            attended: 12,
            missed: 3
        },
        {
            subject: "Programación",
            period: "2025-1",
            totalClasses: 25,
            attended: 24,
            missed: 1
        },
        {
            subject: "Inglés",
            period: "2025-1",
            totalClasses: 18,
            attended: 15,
            missed: 3
        },
        {
            subject: "Física",
            period: "2024-2",
            totalClasses: 22,
            attended: 20,
            missed: 2
        }
    ]
};

// Función para actualizar fecha y hora
function updateDateTime() {
    const now = new Date();
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    const dateTimeStr = now.toLocaleDateString('es-ES', options);
    document.getElementById('datetime').textContent = dateTimeStr;
}

// Función para calcular el porcentaje de asistencia
function calculatePercentage(attended, total) {
    return total > 0 ? Math.round((attended / total) * 100) : 0;
}

// Función para determinar el estado de asistencia
function getAttendanceStatus(percentage) {
    if (percentage >= 90) return "status-present";
    if (percentage >= 80) return "status-warning";
    return "status-danger";
}

// Función para actualizar la información del alumno
function updateStudentInfo() {
    document.getElementById("student-name").textContent = studentData.name;
    document.getElementById("student-id").textContent = `Matrícula: ${studentData.id}`;
}

// Función para llenar el selector de materias
function populateSubjectFilter() {
    const subjectSelect = document.getElementById("subject");
    const subjects = [...new Set(studentData.attendance.map(item => item.subject))];
    
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
}

// Función para filtrar los datos según los criterios seleccionados
function filterData() {
    const period = document.getElementById("period").value;
    const subject = document.getElementById("subject").value;
    
    return studentData.attendance.filter(item => {
        const periodMatch = period === "all" || item.period === period;
        const subjectMatch = subject === "all" || item.subject === subject;
        return periodMatch && subjectMatch;
    });
}

// Función para actualizar el resumen de asistencia
function updateAttendanceSummary(filteredData) {
    const totalClasses = filteredData.reduce((sum, item) => sum + item.totalClasses, 0);
    const attendedClasses = filteredData.reduce((sum, item) => sum + item.attended, 0);
    const missedClasses = filteredData.reduce((sum, item) => sum + item.missed, 0);
    const percentage = calculatePercentage(attendedClasses, totalClasses);
    
    document.getElementById("total-classes").textContent = totalClasses;
    document.getElementById("attended-classes").textContent = attendedClasses;
    document.getElementById("missed-classes").textContent = missedClasses;
    document.getElementById("attendance-percentage").textContent = `${percentage}%`;
}

// Función para actualizar la tabla de detalles
function updateAttendanceTable(filteredData) {
    const tableBody = document.querySelector("#attendance-table tbody");
    tableBody.innerHTML = "";
    
    filteredData.forEach(item => {
        const percentage = calculatePercentage(item.attended, item.totalClasses);
        const status = getAttendanceStatus(percentage);
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.subject}</td>
            <td>${item.totalClasses}</td>
            <td>${item.attended}</td>
            <td>${item.missed}</td>
            <td>${percentage}%</td>
            <td class="${status}">
                ${percentage >= 90 ? "Excelente" : percentage >= 80 ? "Aceptable" : "Bajo"}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para actualizar el año del copyright
function updateCopyrightYear() {
    const year = new Date().getFullYear();
    document.getElementById("current-year").textContent = year;
}

// Función principal para actualizar toda la interfaz
function updateUI() {
    const filteredData = filterData();
    updateAttendanceSummary(filteredData);
    updateAttendanceTable(filteredData);
}

// Event listeners para los filtros
document.getElementById("period").addEventListener("change", updateUI);
document.getElementById("subject").addEventListener("change", updateUI);

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
    updateStudentInfo();
    populateSubjectFilter();
    updateUI();
    updateCopyrightYear();
    updateDateTime(); // Mostrar fecha/hora al cargar
    
    // Actualizar cada segundo
    setInterval(updateDateTime, 1000);
});
