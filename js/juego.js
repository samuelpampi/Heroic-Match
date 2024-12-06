/*
 * Lógica principal y funcionamiento del juego
 */

var cartasTablero = [];
var avatar;
var nick;
var tablero;
var cartasLevantadas = [];
var cartasDescubiertas = [];
var intentos;
var  personajes;
var btnJugar;
var puntos;
var numCartas;

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
    let num_cartas = sizeSession * 3; //El número total de cartas que se van a usar
    let num_parejas = Math.floor(num_cartas / 2); //Número de parejas que se van a usar

    //Si el numero de cartas es par, debemos eliminar una pareja para meter cartas sorpresa
    if(num_cartas%2 == 0){
        num_parejas -= 1;
    }

    //Obtener todas las claves de los héroes
    let heroes = Object.keys(parejas);

    //Crear un diccionario para las parejas seleccionadas
    let parejas_random = {};

    while (Object.keys(parejas_random).length < num_parejas) {
        let random_index = Math.floor(Math.random() * heroes.length);
        let hero = heroes[random_index]; // Seleccionar un héroe aleatorio

        // Si no hemos añadido ya esta pareja, la incluimos
        if (!parejas_random.hasOwnProperty(hero)) {
            parejas_random[hero] = parejas[hero]; // Asignar héroe y su villano
        }
    }

    return parejas_random;
}


/** Extrae una carta sorpresa aleatoria */
function extraerCartaSorpresa(){
    let random_index = Math.floor(Math.random() * Object.keys(cartas_sorpresa).length);
    let key = Object.keys(cartas_sorpresa)[random_index];
    let carta_sorpresa = cartas_sorpresa[key];

    return carta_sorpresa;
}


/**
 * A partir de unas parejas extrae las cartas, una carta sorpresa aleatoria y mezcla las cartas del tablero
 *
 * @returns {{}}
 */
function extraerCartas(){
    //Extraemos parejas de forma aleatoria en funcion del tamaño del tablero
    let parejas_random = extraerParejas();

    //Extraemos las cartas de las parejas
    let cartasSeleccionadas = [];
    for(let hero in parejas_random){
        cartasSeleccionadas.push(cartas[hero]);  //Buscamos la carta del heroe
        cartasSeleccionadas.push(cartas[parejas_random[hero]]); //Buscamos la carta del villano
    }

    //Guardamos el numero de personajes del tablero (sin contar las cartas sorpresa)
    personajes = cartasSeleccionadas.length; 

    //Extraemos una carta sorpresa aleatoria y la añadimos a las cartas seleccionadas (si el tablero es par, debemos sacar dos)
    let carta_sorpresa = extraerCartaSorpresa();
    cartasSeleccionadas.push(carta_sorpresa);
    if((numCartas % 2) == 0){ //El tablero es par, sacar otra carta
        carta_sorpresa = extraerCartaSorpresa();
        cartasSeleccionadas.push(carta_sorpresa);
    } 

    //Desordenamos las cartas
    cartasSeleccionadas = desordenar(cartasSeleccionadas);
    return cartasSeleccionadas;
}


/** Rellena los campos de la seccion de usuario */
function rellenarCampos(){
    nick.innerText = nickSession;
    avatar.src = avatarSession;

    //Rellenar intentos en base a la dificultad
    intentos = calcularIntentos();
    document.getElementById("intentos").innerText = intentos;

    actualizarPuntuacion();
}


/** Calcula los intentos en base a la dificultad */
function calcularIntentos(){
    console.log(intentos_dificultad);
    let num_intentos = intentos_dificultad[parseInt(sizeSession)][difficultySession];
    console.log(num_intentos);
    return num_intentos;
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

        //Quitar las cartas del tablero
        quitarCartaTablero(carta1);
        quitarCartaTablero(carta2);

        //Limpiar la lista de cartas levantadas
        cartasLevantadas = [];
        actualizarPuntuacion();

        //Comprobar fin del juego
        if(cartasDescubiertas.length == personajes){
            finalizarJuego();
        }

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
                }
            });

            //Limpiar la lista de cartas levantadas
            cartasLevantadas = [];

            //Perder un intento
            intentos -= 1;
            document.getElementById("intentos").innerText = intentos;
            if(intentos <= 0){
                finalizarJuego();
            }

        }, 1000);
    }    
}


/**
 * Elimina una carta del tablero, ya que se ha descubierto
 *
 * @param {*} carta
 */
function quitarCartaTablero(carta){
    console.log(carta);
    let index = cartasTablero.findIndex(cartaTablero => cartaTablero.id == carta);
    cartasTablero.splice(index, 1);
    console.log(cartasTablero);
}


/** Actualiza el numero de puntos */
function actualizarPuntuacion(){
    puntos = (cartasDescubiertas.length / 2); //Nº de parejas encontradas
    document.getElementById("puntos").innerText = puntos;
}

/** Finaliza el juego, mostrando la pantalla final y el boton de volver a jugar */
function finalizarJuego(){
    console.log("FIN DEL JUEGO");
    //Bloqueamos para que no se gire ninguna carta
    prohibirVolteo();

    //Mostrar ventana de fin
    let mensaje = "";
    if(cartasDescubiertas.length == personajes){ //Partida ganada
        mensaje = "¡Has ganado!";
    } else if(intentos == 0){
        mensaje = "¡Has perdido!";
    }

    document.getElementById("final-msg").innerText = mensaje;
    document.getElementById("final").style.zIndex = 5; 
    document.getElementById("final").classList.toggle("fondo-final");

    //Mostrar boton de jugar y darle funcionalidad
    btnJugar.classList.toggle("visible");
    btnJugar.addEventListener('click', event => {
        location.reload();
    })
}



//--------------------------------------------------------------------
//ESTA SECCION SOLO CORRESPONDE A LAS ACCIONES DE LAS CARTAS SORPRESA
//--------------------------------------------------------------------

/**
 * Esta funcion recibe la carta sorpresa que levanta el usuario y llama a la funcion correspondiente
 *
 * @param {*} cartaID
 */
function usarCartaSorpresa(cartaID){
    quitarCartaTablero(cartaID);
    switch (cartaID){
        case "dead": cartaPunish(); break;
        case "avengers": cartaAvengers(); break;
        case "hydra": cartaHydra(); break;
        case "shield": cartaShield(); break;
        default: break;
    }
}


/** CARTA AVENGERS: Voltea las cartas durante un tiempo, en funcion de la dificultad */
function cartaAvengers(){
    let mensaje = "Vuelves a mirar las cartas!!";
    mostrarMensaje(mensaje);

    //Volteamos todas las cartas del tablero (Son las que no estan descubiertas)
    for(let carta of cartasTablero){
        //Si la carta esta levantada no hacemos nada
        if(!cartasLevantadas.includes(carta.id)){
            let containerID = `container-${carta.id}`;
            document.getElementById(containerID).classList.toggle('flipped');
            document.getElementById(containerID).addEventListener('click', voltearCarta);
        }
    }  

    let interval = parseInt(tiempo_dificultad[sizeSession][difficultySession]);

    //Esperar X segundos y voltear las cartas
    setTimeout(() => {       
        //Volteamos todas las cartas del tablero (Son las que no estan descubiertas)
        for(let carta of cartasTablero){
            //Si la carta esta levantada no hacemos nada
            if(!cartasLevantadas.includes(carta.id)){
                let containerID = `container-${carta.id}`;
                document.getElementById(containerID).classList.toggle('flipped');
                document.getElementById(containerID).addEventListener('click', voltearCarta);
            }
        }              

    }, interval*1000);

}

/** CARTA SHIELD: Te suma un intento */
function cartaShield(){
    let mensaje = "Ganas un intento!!";
    mostrarMensaje(mensaje);

    intentos += 1;
    document.getElementById("intentos").innerText = intentos;   
}

/** CARTA PUNISH: Te resta un intento */
function cartaPunish(){
    let mensaje = "Pierdes un intento!!";
    mostrarMensaje(mensaje);

    intentos -= 1;
    document.getElementById("intentos").innerText = intentos;   
}

/** Description placeholder */
function cartaHydra(){
    let mensaje = "Se desordena el tablero!!";
    mostrarMensaje(mensaje);

    //Ocultar las cartas levantadas que no esten descubiertas
    for(let cartaLevantada of cartasLevantadas){
        document.getElementById(`container-${cartaLevantada}`).addEventListener('click', voltearCarta); //Volver a permitir volteo
        document.getElementById(`container-${cartaLevantada}`).classList.toggle('flipped');
    }
    cartasLevantadas = [];

    //Desordenamos el array de las cartas del tablero, es decir, las que estan sin descubrir
    cartasTablero = desordenar(cartasTablero);
    let tableroIndex = 0;

    //Recorremos todo el tablero
    let tableroActual = document.getElementsByClassName("carta-container");
    console.log("TABLERO ACTUAL");
    console.log(cartasTablero);

    for(let item of tableroActual){
        //La carta está levantada???
        if(!item.classList.contains("flipped")  && tableroIndex < cartasTablero.length ){
            let newCard = cartasTablero[tableroIndex]; 

            // Actualizamos los atributos del hijo, es decir, al imagen
            let cartaImg = item.querySelector(".carta");
            cartaImg.id = newCard.id;
            cartaImg.src = newCard.img;

            // También puedes ajustar el id del contenedor
            item.id = `container-${newCard.id}`;
            tableroIndex += 1;
            
        }
    }
}

/**
 * Muestra el mensaje que genera la carta sorpresa
 *
 * @param {*} mensaje
 */
function mostrarMensaje(mensaje){
    document.getElementById("mensaje-sorpresa").innerText = mensaje;
    document.getElementById("mensaje-sorpresa").classList.toggle("oculto");

    //Esperar 3 segundos y borrar el mensaje
    setTimeout(() => {
        document.getElementById("mensaje-sorpresa").classList.toggle("oculto");
    }, 3000);
}

//--------------------------------------------------------------------



/** Inicia las variables y eventos principales */
function iniciarEventos(){
    nick = document.getElementById("nick-usuario");
    avatar = document.getElementById("avatar");
    tablero = document.getElementById("tablero");
    btnJugar = document.getElementById("volver-jugar");
    numCartas = parseInt(sizeSession)*3;

    //Rellenar datos usuario
    rellenarCampos();

    //Extraer las cartas con las que se jugará
    cartasTablero = extraerCartas();
    console.log(cartasTablero);

    //Establecer tamaño del tablero
    let ancho = (parseInt(sizeSession)*(100+20)); //Aqui lo que hacemos es calcular el tamaño en base el tamaño y numero de cada carta + un espacio 
    document.getElementById("tablero-container").style.width = `${ancho}px`;
    document.getElementById("tablero").style.width = `${ancho}px`;
    document.getElementById("final").style.width = `${ancho}px`;

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
