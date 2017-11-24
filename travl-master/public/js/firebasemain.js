var config = {
    apiKey: "AIzaSyD2Y9PLbC9AMBIU16yM8qG2rkcOjb45qa4",
    authDomain: "travl-0001.firebaseapp.com",
    databaseURL: "https://travl-0001.firebaseio.com",
    projectId: "travl-0001",
    storageBucket: "travl-0001.appspot.com",
    messagingSenderId: "817976592049"
};
firebase.initializeApp(config);

var auth = firebase.auth();
var regPass = document.getElementById("inputPassword");
var regEmail = document.getElementById("inputUsername");
var regBtn = document.getElementById("btn_signup");

regBtn.addEventListener("click", handleSignup);

function handleSignup(){
    auth.createUserWithEmailAndPassword(regEmail.value, regPass.value)
    .then(function(data){
        console.log("--signed up--")
    })
    .catch(function(err){
        console.log(err.code)
    })
}
