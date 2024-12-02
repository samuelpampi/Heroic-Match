/*
 * Este script maneja la transición de las cartas sorpresa en la ventana de instrucciones
 * para mostrar lo que hace cada una al pasar el ratón por encima.
 */

function cargarEventos() {
    let cartaContainers = document.getElementsByClassName("carta-container");
    let button = document.getElementById("volver");

    // Recorremos cada contenedor de carta
    for (let carta of cartaContainers) {
        // Agregamos los eventos para mouseover y mouseout
        carta.addEventListener('mouseover', event => mostrarExplicacion(event));
        carta.addEventListener('mouseout', event => ocultarExplicacion(event));
    }

    button.addEventListener('click', event => {
        window.location.href = "index.html";
    })
}

function mostrarExplicacion(event) {
    // Aseguramos que obtenemos el contenedor correcto
    let cartaContainer = event.currentTarget; // `currentTarget` asegura que obtenemos el contenedor con el listener
    let carta = cartaContainer.querySelector(".carta");
    let explicacion = cartaContainer.querySelector(".explicacion");

    //Mostrar la explicación
    carta.style.zIndex = "1"; 
    explicacion.style.zIndex = "3"; 
    explicacion.style.backgroundColor = "#000000c4";
    //explicacion.style.display = "block"; // Muestra la explicación si estaba oculta
}

function ocultarExplicacion(event) {
    // Aseguramos que obtenemos el contenedor correcto
    let cartaContainer = event.currentTarget;
    let carta = cartaContainer.querySelector(".carta");
    let explicacion = cartaContainer.querySelector(".explicacion");

    //Ocultamos la explicación
    carta.style.zIndex = "3";
    explicacion.style.zIndex = "1"; 
    explicacion.style.backgroundColor = "";
    //explicacion.style.display = "none"; // Oculta la explicación
}

// Cargamos los eventos principales al cargar la página
document.addEventListener('DOMContentLoaded', cargarEventos);