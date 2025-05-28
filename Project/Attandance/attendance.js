import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, get, child, update } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC1hnJlT9nixcWFTfNSRZVNe-hov1laRS8",
    authDomain: "student-record-system-92.firebaseapp.com",
    databaseURL: "https://student-record-system-92-default-rtdb.firebaseio.com",
    projectId: "student-record-system-92",
    storageBucket: "student-record-system-92.appspot.com",
    messagingSenderId: "595631053147",
    appId: "1:595631053147:web:2a50a7483e983f5c91e27e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let attendanceData = {};

async function fetchStudentNames() {
    const dbRef = ref(database);
    try {
        const snapshot = await get(child(dbRef, 'studentSet'));
        if (snapshot.exists()) {
            const students = snapshot.val();
            const studentList = document.getElementById('studentList');
            studentList.innerHTML = '';
            
            Object.entries(students).forEach(([id, student], index) => {
                const li = document.createElement('li');
                li.className = 'student-item';
                li.style.animationDelay = `${index * 0.1}s`;
                li.innerHTML = `
                    <span class="student-name">${student.fullName}</span>
                    <div class="btn-group">
                        <button class="btn-present" onclick="markAttendance('${id}', 'present', this)">Present</button>
                        <button class="btn-absent" onclick="markAttendance('${id}', 'absent', this)">Absent</button>
                    </div>
                `;
                studentList.appendChild(li);
            });
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
}

window.markAttendance = function(studentId, status, button) {
    const btnGroup = button.parentElement;
    btnGroup.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    attendanceData[studentId] = status;
    updateAttendanceSummary();
};

function updateAttendanceSummary() {
    const present = Object.values(attendanceData).filter(status => status === 'present').length;
    const absent = Object.values(attendanceData).filter(status => status === 'absent').length;
    const total = Object.keys(attendanceData).length;

    document.getElementById('attendanceSummary').innerHTML = `
        Total Students: ${total}<br>
        <font color="#4CAF50">Present: ${present} </font><br>
        <font color="#F44336">Present: ${absent} </font><br>
        

    `;
}

function submitAttendance() {
    const today = new Date().toISOString().split('T')[0];
    const attendanceRef = ref(database, `attendance/${today}`);
    
    update(attendanceRef, attendanceData)
        .then(() => {
            console.log("Attendance submitted successfully!");
            alert("Attendance submitted successfully!");
        })
        .catch((error) => {
            console.error("Error submitting attendance: ", error);
            alert("Error submitting attendance. Please try again.");
        });
}


fetchStudentNames();

document.getElementById('submitBtn').addEventListener('click', submitAttendance);
