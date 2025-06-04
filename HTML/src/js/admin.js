// Datos de ejemplo de alumnos
let students = [
    { id: 1, name: 'Juan', lastname: 'Pérez López', grade: '1°', group: 'A' },
    { id: 2, name: 'María', lastname: 'García Martínez', grade: '2°', group: 'B' },
    { id: 3, name: 'Carlos', lastname: 'Rodríguez Sánchez', grade: '3°', group: 'C' },
    { id: 4, name: 'Ana', lastname: 'Hernández Díaz', grade: '1°', group: 'A' },
    { id: 5, name: 'Luis', lastname: 'Martín González', grade: '4°', group: 'D' }
];

// Mostrar alumnos en la tabla
function renderStudentsTable() {
    const tbody = document.querySelector('#students-table tbody');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.lastname}</td>
            <td>${student.grade}</td>
            <td>${student.group}</td>
            <td>
                <button class="btn btn-edit" data-id="${student.id}">Editar</button>
                <button class="btn btn-delete" data-id="${student.id}">Eliminar</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // Agregar event listeners a los botones
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', editStudent);
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', deleteStudent);
    });
}

// Agregar nuevo alumno
document.getElementById('add-student').addEventListener('click', () => {
    const modal = document.getElementById('student-modal');
    const form = document.getElementById('student-form');
    
    document.getElementById('modal-title').textContent = 'Agregar Nuevo Alumno';
    form.reset();
    document.getElementById('student-id').value = '';
    modal.style.display = 'block';
});

// Editar alumno
function editStudent(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const student = students.find(s => s.id === id);
    
    if (student) {
        const modal = document.getElementById('student-modal');
        const form = document.getElementById('student-form');
        
        document.getElementById('modal-title').textContent = 'Editar Alumno';
        document.getElementById('student-id').value = student.id;
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-lastname').value = student.lastname;
        document.getElementById('student-grade').value = student.grade;
        document.getElementById('student-group').value = student.group;
        
        modal.style.display = 'block';
    }
}

// Eliminar alumno
function deleteStudent(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    
    if (confirm('¿Está seguro de eliminar este alumno?')) {
        students = students.filter(student => student.id !== id);
        renderStudentsTable();
    }
}

// Guardar alumno (agregar o actualizar)
document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value;
    const lastname = document.getElementById('student-lastname').value;
    const grade = document.getElementById('student-grade').value;
    const group = document.getElementById('student-group').value;
    
    if (id) {
        // Actualizar alumno existente
        const index = students.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
            students[index] = { id: parseInt(id), name, lastname, grade, group };
        }
    } else {
        // Agregar nuevo alumno
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        students.push({ id: newId, name, lastname, grade, group });
    }
    
    renderStudentsTable();
    document.getElementById('student-modal').style.display = 'none';
});

// Buscar alumnos
document.querySelector('.btn-search').addEventListener('click', function() {
    const searchTerm = document.getElementById('student-search').value.toLowerCase();
    
    if (searchTerm) {
        const filtered = students.filter(student => 
            student.name.toLowerCase().includes(searchTerm) || 
            student.lastname.toLowerCase().includes(searchTerm) ||
            student.grade.toLowerCase().includes(searchTerm) ||
            student.group.toLowerCase().includes(searchTerm)
        );
        
        // Mostrar resultados filtrados (en un sistema real, haríamos una nueva consulta a la API)
        const tbody = document.querySelector('#students-table tbody');
        tbody.innerHTML = '';
        
        filtered.forEach(student => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.lastname}</td>
                <td>${student.grade}</td>
                <td>${student.group}</td>
                <td>
                    <button class="btn btn-edit" data-id="${student.id}">Editar</button>
                    <button class="btn btn-delete" data-id="${student.id}">Eliminar</button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', editStudent);
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', deleteStudent);
        });
    } else {
        renderStudentsTable();
    }
});

// Inicializar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', renderStudentsTable);
