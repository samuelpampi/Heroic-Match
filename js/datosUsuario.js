/*
* Este script busca guardar y trabajar los datos del usuario
*
*/

//VARIABLES
var nickSession;
var emailSession;
var sizeSession;
var difficultySession;
var avatarSession;

/**
 * Guarda en session los datos del usuario
 *
 * @param {HTMLElement} nick
 * @param {HTMLElement} email
 * @param {HTMLElement} size
 * @param {HTMLElement} difficulty
 * @param {HTMLElement} avatar
 */
function guardarDatosUsuario(nick, email, size, difficulty, avatar){
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('size', size.value);
    sessionStorage.setItem('difficulty', difficulty.value);
    sessionStorage.setItem('avatar', avatar.src);
}

/** Recupera los datos de la session */
function getDatosUsuario(){
    nickSession = sessionStorage.getItem('nick');
    emailSession = sessionStorage.getItem('email');
    sizeSession = sessionStorage.getItem('size');
    difficultySession = sessionStorage.getItem('difficulty');
    avatarSession = sessionStorage.getItem('avatar');
}


/**
 * Comprueba que se haya logeado alguien, sino es asi devuelve false y crea un error
 *
 * @returns {boolean}
 */
function comprobarDatosUsuario(){
    if(nickSession == null){
        sessionStorage.setItem('error', 'Debes cubrir el fomrulario de entrada');
        return false;
    }

    return true;
}