/*
* Este script nos servirá para almacenar los diferentes datos sobre cada personaje, avatar, etc. De forma que podamos mapearlos de la mejor forma posible
*
*/

avatares = {
    capitan: {id:"captain-avatar", img:"./img/avatares/captain-avatar.png"},
    daredevil: {id:"daredevil-avatar", img:"./img/avatares/daredevil-avatar.png"},
    deadpool: {id:"deadpool-avatar", img:"./img/avatares/deadpool-avatar.png"},
    msmarvel: {id:"msmarvel-avatar", img:"./img/avatares/msmarvel-avatar.png"},
    fantastic: {id:"fantastic-avatar", img:"./img/avatares/fantastic-avatar.png"},
    galactus: {id:"galactus-avatar", img:"./img/avatares/galactus-avatar.png"},
    ghostrider: {id:"ghostrider-avatar", img:"./img/avatares/ghostrider-avatar.png"},
    hela: {id:"hela-avatar", img:"./img/avatares/hela-avatar.png"},
    hulk: {id:"hulk-avatar", img:"./img/avatares/hulk-avatar.png"},
    ironman: {id:"ironman-avatar", img:"./img/avatares/ironman-avatar.png"},
    spiderman: {id:"spiderman-avatar", img:"./img/avatares/spiderman-avatar.png"},
    spiderwoman: {id:"spiderwoman-avatar", img:"./img/avatares/spiderwoman-avatar.png"},
    thanos: {id:"thanos-avatar", img:"./img/avatares/thanos-avatar.png"},
    venom: {id:"venom-avatar", img:"./img/avatares/venom-avatar.png"},
    wolverine: {id:"wolverine-avatar", img:"./img/avatares/wolverine-avatar.png"},
}

cartas = {
    antman: {id:"antman", img:"./img/cartas/ant-man.jpg"},    
    blackpanther: {id:"blackpanther", img:"./img/cartas/black-panther.jpg"},
    blackwidow: {id:"blackwidow", img:"./img/cartas/black-widow.jpg"},
    captainamerica: {id:"captainamerica", img:"./img/cartas/captain-america.jpg"},
    cable: {id:"cable", img:"./img/cartas/cable.jpg"},
    daredevil: {id:"daredevil", img:"./img/cartas/daredevil.jpg"},    
    deadpool: {id:"deadpool", img:"./img/cartas/deadpool.jpg"},
    drdoom: {id:"drdoom", img:"./img/cartas/dr-doom.jpg"},
    galactus: {id:"galactus", img:"./img/cartas/galactus.jpg"},
    ghost: {id:"ghost", img:"./img/cartas/ghost.jpg"},
    hulk: {id:"hulk", img:"./img/cartas/hulk.jpg"},
    humanantorch: {id:"humanantorch", img:"./img/cartas/human-antorch.jpg"},    
    ironman: {id:"ironman", img:"./img/cartas/iron-man.jpg"},
    killmonger: {id:"killmonger", img:"./img/cartas/killmonger.jpg"},
    loki: {id:"loki", img:"./img/cartas/loki.jpg"},
    magneto: {id:"magneto", img:"./img/cartas/magneto.jpg"},
    marvel: {id:"marvel", img:"./img/cartas/marvel.jpg"},
    punisher: {id:"punisher", img:"./img/cartas/punisher.jpg"},
    redhulk: {id:"redhulk", img:"./img/cartas/red-hulk.jpg"},
    silversurfer: {id:"silversurfer", img:"./img/cartas/silver-surfer.jpg"},
    spiderman: {id:"spiderman", img:"./img/cartas/spiderman.jpg"},
    taskmaster: {id:"taskmaster", img:"./img/cartas/taskmaster.jpg"},
    thor: {id:"thor", img:"./img/cartas/thor.jpg"},
    ultron: {id:"ultron", img:"./img/cartas/ultron.jpg"},
    venom: {id:"venom", img:"./img/cartas/venom.jpg"},
    wintersoldier: {id:"wintersoldier", img:"./img/cartas/winter-soldier.jpg"},
    wolverine: {id:"wolverine", img:"./img/cartas/wolverine.jpg"},
}

cartas_sorpresa = {
    dead: {id:"dead", img:"./img/cartas/dead.jpg"},
    avengers: {id:"avengers", img:"./img/cartas/avengers.jpg"},
    hydra: {id:"hydra", img:"./img/cartas/hydra.jpg"},
    shield: {id:"shield", img:"./img/cartas/shield.jpg"}
}

parejas = {
    antman: "ghost",
    blackpanther: "killmonger",
    blackwidow: "taskmaster",
    captainamerica: "wintersoldier",
    daredevil: "punisher",
    deadpool: "cable",
    hulk: "redhulk",
    humanantorch: "drdoom",
    ironman: "ultron",
    silversurfer: "galactus",
    spiderman: "venom",
    thor: "loki",
    wolverine: "magneto"
}


intentos_dificultad = {
    "3": { recluta: 4, heroe: 3, vengador: 3 },
    "5": { recluta: 14, heroe: 10, vengador: 7 },
    "7": { recluta: 21, heroe: 15, vengador: 10 }
}

tiempo_dificultad = {
    "3": { recluta: 3, heroe: 2, vengador: 2 },
    "5": { recluta: 4, heroe: 3, vengador: 2 },
    "7": { recluta: 5, heroe: 4, vengador: 3 }
}