/*
 * Lógica principal y funcionamiento del juego
 */


//MAIN DOCUMENT
getDatosUsuario(); //Recuperamos los datos del usuario
//Comprobamos si se ha hecho login
if(!comprobarDatosUsuario()){
    location = "index.html";
}
