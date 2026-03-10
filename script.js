let form = document.getElementById("formInscription");

let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let email = document.getElementById("email");
let password = document.getElementById("password");
let date = document.getElementById("date");
let ville = document.getElementById("ville");



function showError(champ,message){

let small = champ.nextElementSibling;

champ.classList.add("is-invalid");
champ.classList.remove("is-valid");

small.innerText = message;

}



function showSuccess(champ){

let small = champ.nextElementSibling;

champ.classList.remove("is-invalid");
champ.classList.add("is-valid");

small.innerText = "";

}




function verifierChamp(champ,message){

if(champ.value.trim()===""){

showError(champ,message);
return false;

}else{

showSuccess(champ);
return true;

}

}



function validerEmail(){

let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!regex.test(email.value.trim())){

showError(email,"Email invalide");

return false;

}else{

showSuccess(email);

return true;

}

}




function validerPassword(){

if(password.value.trim().length < 6){

showError(password,"Minimum 6 caractères");

return false;

}else{

showSuccess(password);

return true;

}

}



nom.addEventListener("blur",()=>verifierChamp(nom,"Nom obligatoire"));

prenom.addEventListener("blur",()=>verifierChamp(prenom,"Prénom obligatoire"));

email.addEventListener("blur",validerEmail);

password.addEventListener("blur",validerPassword);

date.addEventListener("blur",()=>verifierChamp(date,"Date obligatoire"));

ville.addEventListener("change",()=>verifierChamp(ville,"Choisissez une ville"));





form.addEventListener("submit",function(e){

if(
!verifierChamp(nom,"Nom obligatoire") ||
!verifierChamp(prenom,"Prénom obligatoire") ||
!validerEmail() ||
!validerPassword() ||
!verifierChamp(date,"Date obligatoire") ||
!verifierChamp(ville,"Choisissez une ville")
){

alert("Veuillez corriger les erreurs");

e.preventDefault();

}

});