/*** Aplicación que maneja el registro, login de usuario */

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA2xKhWKSWsyMAeTznzyNllv2hRHpADoIA",
    authDomain: "login-253c8.firebaseapp.com",
    databaseURL: "https://login-253c8.firebaseio.com",
    projectId: "login-253c8",
    storageBucket: "login-253c8.appspot.com",
    messagingSenderId: "964965936532",
    appId: "1:964965936532:web:151d241f939f122f423381",
    measurementId: "G-2CZYLYJ2GP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Observador de estado de autenticación
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log("usuario logeado ok")
        contenidoUsuarioReg(user);
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        var verificado = "";

        if (emailVerified === false) {
            verificado = "(El email no se ha verificado aún.)";
        } else {
            verificado = "(El email se ha verificado)";
        }

    } else {
        console.log("usuario no logeado")

    }
});

//funcion que registra los datos del nuevo usuario
function registrar() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            alert(errorMessage);
            // ...
        })
        .then(function () {
            verificar();
            window.setTimeout(function () {
                // redireccion
                window.location.replace("dashboard.html");
            }, 5000);
        });
}
function verificar() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification()
        .then(function () {
            // Email sent.
            console.log("correo enviado al usuario");
            var alertaReg = document.getElementById('alertaRegistro');
            alertaReg.innerHTML = (`<div class="alert alert-primary" id="alert" role="alert">Se ha enviado un email a su casilla de correo electrónico!</div>`)
        })
        .catch(function (error) {
            // An error happened.
        });

}
//funcion de login del usuario registrado
function acceso() {
    var emailA = document.getElementById("emailA").value;
    var passwordA = document.getElementById("passwordA").value;

    firebase.auth().signInWithEmailAndPassword(emailA, passwordA)
        .then(function () {
            window.location.replace("dashboard.html");
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            alert(errorMessage);
        });
}

function cerrar() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Desconectado correctamente!');
            var alertaDash = document.getElementById('contenido');
            alertaDash.innerHTML = (`<div class="alert alert-success" id="alert" role="alert"><h2>Hasta pronto!</h2></div>`)
        })
        .then(function () {
            window.location.replace("index.html");
        })
        .catch(function (error) {
            console.log(error);
        })
}

function contenidoUsuarioReg(user) { //aparece
    var user = user;
    var contenido = document.getElementById("contenido");

    if (user.emailVerified) {
        contenido.innerHTML = (`

        <div class="jumbotron">
        <div class="container">
          <h1 class="display-3">Bienvenido!</h1>
          <p>Front creado con HTML+CSS+Bootstrap+Javascript</p>
          <p>Back creado con JS & Firebase</p>
          <p><a class="btn btn-primary btn-lg" onclick="cerrar()" role="button">Cerrar Sesión</a></p>
        </div>
      </div>`);

    } else {
        var alertaDash = document.getElementById('contenido');
        alertaDash.innerHTML = (`<div class="alert alert-primary" id="alert" role="alert">Para ver el contenido, primero debe <strong>validar</strong> su email. Revise su casilla de correo electrónico y luego <strong>actualice</strong> esta página!</div>`)
    }
}

