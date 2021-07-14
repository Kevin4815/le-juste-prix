// Récupère les balises et id dans la page HTML
let input = document.querySelector('input');
let error = document.querySelector('#error');
let again = document.querySelector('#again');
let game = document.querySelector('#game');
let form = document.querySelector('form');

// Génère un nombre aléatoire entre 1 et 10

function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let random = rand(1, 30);

let vies = 5;

// Vérifie le nombre entré
function start(){

    //Créer la div qui servira à afficher les instructions
    let instruction = document.createElement('div');
       
    if(input.value == random){
        instruction.textContent = "Bravo ! C'était bien " + input.value + " !";
        instruction.className = "instruction-win"; 
        input.disabled = true;  
        setTimeout("end()", 1250);
    }
    else if(input.value > random && vies > 0){
        vies--;
        instruction.textContent = "Vies : "+vies + " - C'est moins de " + input.value;
        instruction.className = "instruction-less";
        if(vies <= 0){
            end();
        }
    }
    else if(input.value < random && vies > 0){
        vies--;
        instruction.textContent = "Vies : "+vies + " - C'est plus de " + input.value;
        instruction.className = "instruction-more";
        if(vies <= 0){
            end();
        }
    }
    
    document.querySelector('#instructions').prepend(instruction);
    
    input.value = ""; 
}

// Vérifie si la valeur entrée et bien un chiffre
input.addEventListener('keyup' , () => {
    if(isNaN(input.value)) {
        error.style.display = "block";
    }
    else {
        error.style.display = "none";
    }
});

// Démarre le jeu et permet d'envoyer son chiffre au clic ou en appuyant sur entrer
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(isNaN(input.value) || input.value == "") {
        error.style.display = "block";
        setTimeout("wrong()", 1500);
        return
    }else {
        start();
    } 
});

// Rafraîchi la page si le joueur veut rejouer
let restart = document.querySelector('#restart').addEventListener('click', () => {
    refreshPage();
});

// Affiche un message si le joueur decide de ne pas rejouer
let stop = document.querySelector('#stop').addEventListener('click', () => {

    $('#finish').fadeIn();
    again.style.display = "none";

});

function refreshPage(){
    window.location.reload();
}
 
// Affiche la div de fin de jeu quand le joueur n'a plus de vies
function end(){
    $('h3').css('display', 'none');
    $('#again').fadeIn();
    game.style.display = "none";
}
