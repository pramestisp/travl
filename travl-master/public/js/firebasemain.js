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
var loginPass = document.getElementById("logininputPassword");
var loginEmail = document.getElementById("logininputEmail");
var loginBtn = document.getElementById("btn_login");
var modalBtn = document.getElementById("loginSignup");
var profileBtn = document.getElementById("viewProfile");
var logoutBtn = document.getElementById("logout");

regBtn.addEventListener("click", handleSignup);
loginBtn.addEventListener("click", handleLogin);
logoutBtn.addEventListener("click", handleLogout);

function handleSignup(){
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    auth.createUserWithEmailAndPassword(regEmail.value, regPass.value)
    .then(function(data){
        console.log("--signed up--")
        alert('You are successfully registered!')
        $("#loginModal").modal("hide")
    })
    .catch(function(err){
        console.log(err.code)
        alert(err.message)
    })
}

function handleLogin(){
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    auth.signInWithEmailAndPassword(loginEmail.value, loginPass.value)
    .then(function(data){
        console.log("--logged in--")
        alert('You are successfully logged in!')
        $("#loginModal").modal("hide")
        

    })
    .catch(function(err){
        console.log(err.code)
        alert(err.message)
    })
}

function handleLogout(){
        auth.signOut().then(function() {
        console.log("--logged out--")
        alert('You are successfully logged out!')
    })
    .catch(function(err){
        console.log(err.code)
    })
}

auth.onAuthStateChanged(function(user){
    if(user){
        modalBtn.classList.add('hidden')
        profileBtn.classList.remove('hidden')
        logoutBtn.classList.remove('hidden')
        loginEmail.value = ""
        loginPass.value = ""
        regEmail.value =""
        regPass.value =""
    } else{
        modalBtn.classList.remove('hidden')
        profileBtn.classList.add('hidden')
        logoutBtn.classList.add('hidden')
    }
})