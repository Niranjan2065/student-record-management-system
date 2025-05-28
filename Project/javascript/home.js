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
  
  window.onload = function () {
    const user = auth.currentUser;
  
    if (user) {
      
      firestore.collection('students').doc(user.uid).get()
        .then(doc => {
          if (doc.exists) {
            document.getElementById('welcomeMessage').innerText = `Welcome, ${doc.data().fullName}!`;
          } else {
            
            return firestore.collection('teachers').doc(user.uid).get();
          }
        })
        .then(doc => {
          if (doc.exists) {
            document.getElementById('welcomeMessage').innerText = `Welcome, ${doc.data().fullName}!`;
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error.message);
          document.getElementById('welcomeMessage').innerText = 'Error loading user data.';
        });
    } else {
 
      window.location.href = 'login.html';
    }
  };
  
  function logout() {
    auth.signOut()
      .then(() => {
        window.location.href = 'login.html';
      })
      .catch(error => {
        console.error('Error signing out:', error.message);
      });
  }
  