import { db, ref, onValue } from './firebaseConfig.js';

let selectedCourses = [];

// Load available courses from Firebase
function loadCourses() {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = ""; // Clear previous list

  onValue(ref(db, 'courses'), (snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const courseData = childSnapshot.val();

        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course-item");

        const courseInfo = `${courseData.courseCode}: ${courseData.courseName} - ${courseData.courseFaculty} (${courseData.courseSlot})`;
        courseDiv.textContent = courseInfo;

        const selectButton = document.createElement("button");
        selectButton.textContent = "Select";
        selectButton.onclick = () => selectCourse(courseData);

        courseDiv.appendChild(selectButton);
        courseList.appendChild(courseDiv);
      });
    } else {
      courseList.innerHTML = "<p>No courses available.</p>";
    }
  }, (error) => {
    console.error("Error loading courses:", error);
    alert("Error loading courses. Please try again.");
  });
}

// Function to select a course and display it in the selected courses table
function selectCourse(courseData) {
  if (!selectedCourses.some(course => course.courseCode === courseData.courseCode)) {
    selectedCourses.push(courseData);
    updateSelectedCoursesTable();
  } else {
    alert("You have already selected this course.");
  }
}

// Function to update the selected courses table
function updateSelectedCoursesTable() {
  const selectedCoursesList = document.getElementById("selectedCoursesList");
  selectedCoursesList.innerHTML = ""; // Clear previous table content

  selectedCourses.forEach((course, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${course.courseCode}</td>
      <td>${course.courseName}</td>
      <td>${course.courseFaculty}</td>
      <td>${course.courseSlot}</td>
    `;
    selectedCoursesList.appendChild(row);
  });
}

// Function to generate timetable based on selected courses
function generateTimetable() {
  const timetableList = document.getElementById("timetableList");
  timetableList.innerHTML = ""; // Clear previous timetable

  if (selectedCourses.length === 0) {
    timetableList.innerHTML = "<tr><td colspan='5'>No courses selected.</td></tr>";
    return;
  }

  selectedCourses.forEach((course, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${course.courseCode}</td>
      <td>${course.courseName}</td>
      <td>${course.courseFaculty}</td>
      <td>${course.courseSlot}</td>
    `;
    timetableList.appendChild(row);
  });
}

// Load courses when the page loads
window.onload = function() {
  loadCourses();
  document.getElementById("generateTimetableBtn").onclick = generateTimetable;
};
