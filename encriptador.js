//Declaración de variables globales
const textArea = document.querySelector("#form__input");
const imagenEncriptador = document.querySelector("#logo-aside-encription");
const loaderBar = document.querySelector("#loader-bar");
const resultTitle = document.querySelector("#result__title");
const resultText = document.querySelector("#result__text");
const btnEncryption = document.querySelector("#encriptar_btn");
const btnDeseencryption = document.querySelector("#desencriptat_btn");
const btnCopy = document.querySelector("#result_btn");

function encryptationMessage(phrase) {
    let changeWords = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat"
    };
    return phrase.replace(/a|e|i|o|u/g, 
    function(matched) {
        return changeWords[matched];
    });
}


function recoverOriginalPhrase(phrase){
    let changeWords = {
        ai: "a",
        enter: "e",
        imes: "i",
        ober: "o",
        ufat: "u"
    };
    
    return phrase.replace(/ai|enter|imes|ober|ufat/g, 
    function(matched) {
        return changeWords[matched];
    });
}

/*
let listPhrases = new Map();
// Ejemplo de uso:
let phrase = prompt("Ingrese su palabra: \n");
// let phraseTwo = prompt("Ingrese su palabra: \n");

let encriptation = replaceCharacters(phrase);
let recoverPhrase = recoverOriginalPhrase(phrase)
console.log(`Palabra encriptada : ${encriptation}`); // Resultado: "gimesatob"
console.log(`Palabra desencriptada ${recoverPhrase}`)


// let encriptationTwo = replaceCharacters(phraseTwo);
// let recoverPhraseTwo = recoverOriginalPhrase(phraseTwo)
// console.log(`Palbra encriptada : ${encriptationTwo}`); // Resultado: "gimesatob"
// console.log(`Palabra desencriptada ${recoverPhraseTwo}`)

listPhrases.set(phrase,encriptation);
// listPhrases.set(phraseTwo,encriptationTwo);

let valores = Object.keys(listPhrases);

let indice = 1;
for (var [key, value] of listPhrases){
    console.log(`Prinera ${key} ==== '${value} ==== ${indice}`);
    indice +=1;
}

*/

//Función que permite esconder la imagen de carga al momento en que se escribe en 
//el TextArea

//Ocultar elementos de manera dinamica mediante el uso del Text Area
textArea.addEventListener("input",(e)=>{
    imagenEncriptador.style.display = "none";//Al momento de escribir en el textarea desaparece la imagen buscar
    loaderBar.classList.remove("hidden");//Al momento de buscar aparece el logo del loader
    resultTitle.textContent = "Encriptación en ejecución...." //Cambiar el mensaje mientras escribe en el textarea
    resultText.textContent = ""; //se deja en blanco para no mostrar el mensaje
});

//Programación del boton ENCRIPTAR
btnEncryption.addEventListener("click",(e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();//Convertir mensaje a minusculas
    let mensajeEncriptado = encryptationMessage(mensaje); //pasar el mensaje del textarea a la funcion
    resultText.textContent = mensajeEncriptado; //cargar en el textarea el resutlado de la encriptacion
    btnCopy.classList.remove("hidden"); //cambiar el estado del boton copiar de hidden a visible
    resultTitle.textContent = "El resultado es:" //Agregar el titulo del resultado
});

//Programación del botón desencriptar
btnDeseencryption.addEventListener("click",(e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = recoverOriginalPhrase(mensaje);
    resultText.textContent = mensajeDesencriptado;
    resultTitle.textContent = "El resultado es:" //Agregar el titulo del resultado
    btnCopy.classList.remove("hidden"); //cambiar el estado del boton copiar de hidden a visible
});

btnCopy.addEventListener("click",()=>{
    let copyText = resultText.textContent;
    navigator.clipboard.writeText(copyText).then(()=>{
        imagenEncriptador.style.display = "block";
        loaderBar.classList.add("hidden");
        console.log(`Texto copiado ${copyText}`);
        resultTitle.textContent = "El texto se copio";
        btnCopy.classList.add("hidden");
    });
});