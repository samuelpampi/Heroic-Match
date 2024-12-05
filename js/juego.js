/*
 * Lógica principal y funcionamiento del juego
 */

var cartasTablero = [];
var avatar;
var nick;
var tablero;
var cartasLevantadas = [];
var cartasDescubiertas = [];

/**
 * Desordena el array que le pasemos
 *
 * @param {*} array
 * @returns {{}}
 */
function desordenar(array) {
    let copia = [...array]; // Creamos una copia del array original para no modificarlo
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 y i
        [copia[i], copia[j]] = [copia[j], copia[i]]; // Intercambiamos los elementos
    }
    return copia;
}



/**
 * Extrae un array de parejas, a partir del conjunto de parejas, de forma aleatoria
 *
 * @returns {{}}
 */
function extraerParejas() {
    const num_cartas = sizeSession * 3; //El número total de cartas que se van a usar
    const num_parejas = Math.floor(num_cartas / 2); //Número de parejas que se van a usar

    //Obtener todas las claves de los héroes
    const heroes = Object.keys(parejas);

    //Crear un diccionario para las parejas seleccionadas
    const parejas_random = {};

    while (Object.keys(parejas_random).length < num_parejas) {
        const random_index = Math.floor(Math.random() * heroes.length);
        const hero = heroes[random_index]; // Seleccionar un héroe aleatorio

        // Si no hemos añadido ya esta pareja, la incluimos
        if (!parejas_random.hasOwnProperty(hero)) {
            parejas_random[hero] = parejas[hero]; // Asignar héroe y su villano
        }
    }

    return parejas_random;
}

/**
 * A partir de unas parejas extrae las cartas, una carta sorpresa aleatoria y mezcla las cartas del tablero
 *
 * @returns {{}}
 */
function extraerCartas(){
    //Extraemos parejas de forma aleatoria en funcion del tamaño del tablero
    let parejas_random = extraerParejas();

    //Extraemos una carta sorpresa aleatoria
    let random_index = Math.floor(Math.random() * Object.keys(cartas_sorpresa).length);
    let key = Object.keys(cartas_sorpresa)[random_index];
    let carta_sorpresa = cartas_sorpresa[key];

    //Extraemos las cartas de las parejas
    let cartasSeleccionadas = [];
    for(let hero in parejas_random){
        cartasSeleccionadas.push(cartas[hero]);  //Buscamos la carta del heroe
        cartasSeleccionadas.push(cartas[parejas_random[hero]]); //Buscamos la carta del villano
    }

    //Añadimos la carta sorpresa
    console.log(cartasSeleccionadas);
    cartasSeleccionadas.push(carta_sorpresa);

    //Desordenamos las cartas
    cartasSeleccionadas = desordenar(cartasSeleccionadas);
    return cartasSeleccionadas;
}


/** Rellena los campos de la seccion de usuario */
function rellenarCampos(){
    nick.innerText = nickSession;
    avatar.src = avatarSession;
}


/** Habilita el volteo de todas las cartas */
function permitirVolteo(){
    let cartaContainer = document.getElementsByClassName("carta-container");
    Array.from(cartaContainer).forEach(carta => {
        carta.addEventListener('click', voltearCarta);
    });
}


/** Prohibe el volteo de todas las cartas */
function prohibirVolteo(){
    let cartaContainer = document.getElementsByClassName("carta-container");
    Array.from(cartaContainer).forEach(carta => {
        carta.removeEventListener('click', voltearCarta);
    });
}


/**
 * Voltea una carta, pero debe comprobar el numero de cartas volteadas para verificar si es pareja o no
 *
 * @param {*} event
 */
function voltearCarta(event){
    let carta = event.currentTarget;
    let cartaID = carta.querySelector('.carta').id; //Obtenemos el id del hijo, es decir, de la carta que es la imagen

    //Solo levantamos si las cartas levantadas son menos de 2
    if(cartasLevantadas.length < 2){
        //Voltea la carta si no está volteada
        carta.classList.toggle('flipped');
        //Bloquear la carta para no volver a girarla hasta que se compruebe su pareja
        carta.removeEventListener('click', voltearCarta);

        //Comprobamos si es una carta sorpresa
        if(Object.keys(cartas_sorpresa).includes(cartaID)){
            console.log("CARTA SORPRESA");
            usarCartaSorpresa(cartaID);

        } else{ //Si no lo es, comprobamos

            //Añade la carta a la lista de volteadas
            cartasLevantadas.push(cartaID);

            //Cuando se hayan levantado 2 cartas, comprobamos si son pareja
            if(cartasLevantadas.length == 2){
                comprobarParejas();
            }
        }

        
    }
}


/**
 * Esta funcion recibe la carta sorpresa que levanta el usuario y llama a la funcion correspondiente
 *
 * @param {*} cartaID
 */
function usarCartaSorpresa(cartaID){
    let mensaje = "";
    switch (cartaID){
        case "dead": mensaje = "Pierdes un intento!!"; break;
        case "avengers": mensaje = "Vuelves a mirar las cartas!!"; break;
        case "hydra": mensaje = "Se desordena el tablero!!"; break;
        case "shield": mensaje = "Ganas un intento!!"; break;
        default: mensaje = ""; break;
    }

    document.getElementById("mensaje-sorpresa").innerText = mensaje;
    document.getElementById("mensaje-sorpresa").classList.toggle("oculto");

    //Esperar 3 segundos y borrar el mensaje
    setTimeout(() => {
        document.getElementById("mensaje-sorpresa").classList.toggle("oculto");
    }, 3000);
}


/** Comprueba si las dos cartas levantadas son parejas, sino lo son las vuelve a girar */
function comprobarParejas(){
    console.log("COMPROBAR PAREJAS");
    console.log(cartasLevantadas);

    let carta1 = cartasLevantadas[0];
    let carta2 = cartasLevantadas[1];

    //Comprobamos si el valor de una es la otra o viceversa en el diccionario de parejas
    if(parejas[carta1] == carta2 || parejas[carta2] == carta1){
        console.log("SON PAREJA!!!");
        //Guardar las cartas, dejarlas bloquadas para que no se giren y seguir con la ejecucion
        cartasDescubiertas.push(carta1);
        cartasDescubiertas.push(carta2);

        //Limpiar la lista de cartas levantadas
        cartasLevantadas = [];

    } else{
        console.log("NO SON PAREJA!!!");

        //Esperar 2 segundos y voltear las cartas
        setTimeout(() => {
            cartasLevantadas.forEach(cartaId => {
                //Localizamos el contenedor padre (carta-container) por su ID
                let cartaContainer = document.getElementById(`container-${cartaId}`);
                
                if (cartaContainer) {
                    //Gira la carta
                    cartaContainer.addEventListener('click', voltearCarta); //Volver a permitir volteo
                    cartaContainer.classList.toggle('flipped');
                    console.log("girar cartas");
                }
            });

            //Limpiar la lista de cartas levantadas
            cartasLevantadas = [];
        }, 1000);
    }    
}


/** Inicia las variables y eventos principales */
function iniciarEventos(){
    nick = document.getElementById("nick-usuario");
    avatar = document.getElementById("avatar");
    tablero = document.getElementById("tablero");

    //Rellenar datos usuario
    rellenarCampos();

    //Extraer las cartas con las que se jugará
    cartasTablero = extraerCartas();
    console.log(cartasTablero);

    //Rellenar Tablero
    tablero.style.gridTemplateColumns = `repeat(${sizeSession}, 1fr)`; //Establecemos el tamaño del panel
    for(let carta of cartasTablero){
        let cartaHTML = `<div class="carta-container" id="container-${carta.id}">
                            <img class="carta" id="${carta.id}" src="${carta.img}" alt="carta">
                            <img class="dorso" src="./img/cartas/marvel.jpg" alt="carta">
                        </div>`;

        tablero.insertAdjacentHTML('beforeend', cartaHTML);
    }   

    //Crear eventos para dar la vuelta a las cartas
    permitirVolteo();

}



//MAIN DOCUMENT
getDatosUsuario(); //Recuperamos los datos del usuario
//Comprobamos si se ha hecho login
if(!comprobarDatosUsuario()){
    location = "index.html";
}

document.addEventListener('DOMContentLoaded', iniciarEventos);
