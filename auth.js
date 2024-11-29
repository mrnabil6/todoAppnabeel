



const firebaseConfig = {
  apiKey: "AIzaSyD5RvUaP0j2-aYz1yZu-YY3XZgY6BdU5eM",
  authDomain: "todoapp-85646.firebaseapp.com",
  projectId: "todoapp-85646",
  storageBucket: "todoapp-85646.firebasestorage.app",
  messagingSenderId: "663502652841",
  appId: "1:663502652841:web:b54ebfd57e6ea52a3e30b8"
};

firebase.initializeApp(firebaseConfig);

var email = document.getElementById("email")
var password = document.getElementById("password")


function signUp() {
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((userCredential) => {
    localStorage.setItem("userId", userCredential.user.uid)
    console.log("Succewss");
    window.location.href = 'file:///D:/nabeel/class/TODO%20App/todoapplogin.html'

  })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
      // ..
    });
}




function Login() {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value).then((userCredential) => {

    localStorage.setItem("userId", userCredential.user.uid)
    window.location.href = 'file:///D:/nabeel/class/TODO%20App/todoapplogin.html'

  })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
      // ..
    });
}


