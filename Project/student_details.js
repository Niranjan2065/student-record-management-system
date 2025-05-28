const firebaseConfig = {
    apiKey: "AIzaSyC1hnJlT9nixcWFTfNSRZVNe-hov1laRS8",
    authDomain: "student-record-system-92.firebaseapp.com",
    databaseURL: "https://student-record-system-92-default-rtdb.firebaseio.com",
    projectId: "student-record-system-92",
    storageBucket: "student-record-system-92.appspot.com",
    messagingSenderId: "595631053147",
    appId: "1:595631053147:web:2a50a7483e983f5c91e27e"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function getStudentDetails() {
    const regNo = document.getElementById('regNo').value;
    const studentRef = database.ref('studentSet/' + regNo);
    
    studentRef.once('value').then((snapshot) => {
        const studentDetailsDiv = document.getElementById('studentDetails');
        
        if (snapshot.exists()) {
            const studentData = snapshot.val();
            let tableHTML = '<table><tr><th>Field</th><th>Value</th></tr>';
            
            for (let key in studentData) {
                if (studentData.hasOwnProperty(key)) {
                    const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
                    tableHTML += `<tr><td>${displayKey}</td><td>${studentData[key]}</td></tr>`;
                }
            }
            
            tableHTML += '</table>';
            studentDetailsDiv.innerHTML = tableHTML;
        } else {
            studentDetailsDiv.innerHTML = '<p class="error">No student found with this registration number.</p>';
        }
    }).catch((error) => {
        console.error("Error fetching student data:", error);
        document.getElementById('studentDetails').innerHTML = '<p class="error">Error fetching student data. Please try again.</p>';
    });
    
}