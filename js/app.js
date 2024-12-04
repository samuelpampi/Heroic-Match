
//CREACION DE VARIABLES
var gridAvatares;
var nick;
var size;
var difficulty;
var selectedAvatar;
var avatarImg;
var button;
var error;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nickRegex = /^[A-Za-z][A-Za-z0-9_]{3,}$/;

/** Recorre el diccionario de avatares de dataset par air añadiendolos de forma dinamica al grid */
function rellenarAvatares(){
    for(let avatar in avatares){
        let avatarHTML = `<img class="avatar" id="${avatares[avatar].id}" src="${avatares[avatar].img}" alt="avatar">`;
        gridAvatares.insertAdjacentHTML('beforeend', avatarHTML);
    }
}

/**
 * Comprueba que los datos del formulario sean correctos antes de guardarlos
 *
 * @param {*} event
 * @returns {boolean}
 */
function comprobarFormulario(event){
    if(nick.value.length < 4){
        nick.focus();
        event.preventDefault();
        error.innerText = "El Nick debe tener al menos 4 caracteres";
        return false;
    } else if(!nick.value.match(nickRegex)){
        nick.focus();
        event.preventDefault();
        error.innerText = "El Nick no debe empezar por numero ni contener espacios";
        return false;
    } else if(!email.value.match(emailRegex)){
        email.focus();
        event.preventDefault();
        error.innerText = "El email no es valido";
        return false;
    } else if(size.value=="0"){
        size.focus();
        event.preventDefault();
        error.innerText = "Es necesario seleccionar un tamaño del tablero";
        return false;
    } else if(size.value=="0"){
        size.focus();
        event.preventDefault();
        error.innerText = "Es necesario seleccionar un tamaño del tablero";
        return false;
    } 

    guardarDatosUsuario(nick, email, size, difficulty, selectedAvatar);
    return true;
}

/** Recupera elementos del dom y inicia los eventos principales */
function cargarEventos(){
    //Recuperamos elementos del dom
    gridAvatares = document.getElementById("grid-avatares");
    nick = document.getElementById("nick");
    size = document.getElementById("number-cartas");
    difficulty = document.getElementById("dificultad");
    button = document.getElementById("jugar");
    error = document.getElementById("error");
    selectedAvatar = document.getElementById("selected-avatar-img");

    //Rellenamos de forma dinamica el grid de avatares y añadimos sus eventos
    rellenarAvatares();
    for(let avatar of document.getElementsByClassName("avatar")){
        avatar.addEventListener('dragstart', event => {
            avatarImg = event.target.src; //Guardamos la imagen que está moviendo
        });
    }

    selectedAvatar.addEventListener('dragover', event => {
        event.preventDefault();
    });

    selectedAvatar.addEventListener('drop', event => {
        selectedAvatar.src = avatarImg; //Asignamos al avatar seleccionado la imagen del avatar que se ha soltado
    });

    //Comprobar si hay error, por si a entrado sin logearse
    if(sessionStorage.getItem('error')){
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    //Añadimos eventos
    button.addEventListener("click", comprobarFormulario);
}


//MAIN DOCUMENT
document.addEventListener('DOMContentLoaded', cargarEventos);