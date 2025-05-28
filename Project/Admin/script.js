// script.js
document.getElementById('addStudentBtn').addEventListener('click', function() {
    const regNo = document.getElementById('newStudentRegNo').value;
    const name = document.getElementById('newStudentName').value;
    set(ref(db, 'students/' + regNo), {
        name: name
    }).then(() => {
        alert('Student added successfully!');
    }).catch((error) => {
        alert('Error: ' + error);
    });
});

document.getElementById('deleteStudentBtn').addEventListener('click', function() {
    const regNo = document.getElementById('studentRegNo').value;
    remove(ref(db, 'students/' + regNo)).then(() => {
        alert('Student deleted successfully!');
    }).catch((error) => {
        alert('Error: ' + error);
    });
});

document.getElementById('deleteTeacherBtn').addEventListener('click', function() {
    const email = document.getElementById('teacherEmail').value;
    remove(ref(db, 'teachers/' + email)).then(() => {
        alert('Teacher deleted successfully!');
    }).catch((error) => {
        alert('Error: ' + error);
    });
});

// Additional functions for viewing profiles can be added similarly
