document.addEventListener('DOMContentLoaded', function () {
  var firebaseConfig = {
    apiKey: "AIzaSyC1hnJlT9nixcWFTfNSRZVNe-hov1laRS8",
    authDomain: "student-record-system-92.firebaseapp.com",
    projectId: "student-record-system-92",
    storageBucket: "student-record-system-92.appspot.com",
    messagingSenderId: "595631053147",
    appId: "1:595631053147:web:2a50a7483e983f5c91e27e"
  };
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  // Signup
  document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const fullName = document.getElementById('fullName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        return user.updateProfile({
          displayName: fullName
        }).then(() => {
          const userData = {
            username: username,
            fullName: fullName,
            email: email,
            mobileNumber: mobileNumber
          };
          
          if (role === 'student') {
            return firestore.collection('students').doc(user.uid).set(userData);
          } else {
            return firestore.collection('teachers').doc(user.uid).set(userData);
          }
        });
      })
      .then(() => {
        alert('Signup successful!');
        window.location.href = 'login.html';
      })
      .catch(error => {
        console.error('Error signing up:', error.message);
        alert('Signup failed: ' + error.message);
      });
  });

  // Login
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
     
        window.location.href = 'home.html';
      })
      .catch(error => {
        console.error('Error logging in:', error.message);
        let message;
        switch (error.code) {
          case 'auth/wrong-password':
            message = 'Invalid password. Please try again.';
            break;
          case 'auth/user-not-found':
            message = 'Invalid email. Please check your email address.';
            break;
          case 'auth/invalid-email':
            message = 'Invalid email format. Please check your email address.';
            break;
          default:
            message = 'Login failed: ' + error.message;
        }
        alert(message);
      });
  });
});
