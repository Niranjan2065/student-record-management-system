// Import Firebase functions
import { db, ref, set, push, onValue } from './firebaseConfig.js';

function addCourse() {
  const courseCode = document.getElementById("courseCode").value.trim();
  const courseName = document.getElementById("courseName").value.trim();
  const courseFaculty = document.getElementById("courseFaculty").value.trim();
  const courseSlot = document.getElementById("courseSlot").value.trim();

  if (!courseCode || !courseName || !courseFaculty || !courseSlot) {
    alert("Please fill in all fields.");
    return;
  }

  const courseRef = push(ref(db, 'courses'));

  set(courseRef, {
    courseCode,
    courseName,
    courseFaculty,
    courseSlot
  })
  .then(() => {
    alert("Course added successfully.");
    clearFields();
    loadCourses(); // Refresh course list after adding
  })
  .catch(error => {
    console.error("Error adding course:", error);
    alert("Error adding course. Please try again.");
  });
}

// Function to clear input fields
function clearFields() {
  document.getElementById("courseCode").value = "";
  document.getElementById("courseName").value = "";
  document.getElementById("courseFaculty").value = "";
  document.getElementById("courseSlot").value = "";
}

// Load and display courses in a table
function loadCourses() {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = ""; // Clear previous list

  onValue(ref(db, 'courses'), (snapshot) => {
    if (snapshot.exists()) {
      let sno = 1; // Serial number for courses
      snapshot.forEach((childSnapshot) => {
        const courseData = childSnapshot.val();
        
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${sno++}</td>
          <td>${courseData.courseCode}</td>
          <td>${courseData.courseName}</td>
          <td>${courseData.courseFaculty}</td>
          <td>${courseData.courseSlot}</td>
        `;
        courseList.appendChild(row);
      });
    } else {
      courseList.innerHTML = "<tr><td colspan='5'>No courses available.</td></tr>";
    }
  }, (error) => {
    console.error("Error loading courses:", error);
    alert("Error loading courses. Please try again.");
  });
}

// Load courses when the page loads
window.onload = loadCourses;

// Attach the addCourse function to the button onclick event
document.querySelector("button").onclick = addCourse;
