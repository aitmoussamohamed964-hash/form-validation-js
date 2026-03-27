// Déclaration des éléments
let form = document.getElementById("formInscription");
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let email = document.getElementById("email");
let password = document.getElementById("password");
let date = document.getElementById("date");
let ville = document.getElementById("ville");
let conditions = document.getElementById("conditions");
let table_body = document.getElementById("table_body");

// Liste des utilisateurs
let utilisateurs = [];

// Fonction pour afficher erreur
function showError(champ, message){
    let small = champ.nextElementSibling;
    champ.classList.add("is-invalid");
    champ.classList.remove("is-valid");
    small.innerText = message;
}

// Fonction pour succès
function showSuccess(champ){
    let small = champ.nextElementSibling;
    champ.classList.remove("is-invalid");
    champ.classList.add("is-valid");
    small.innerText = "";
}

// Vérifier champ vide
function verifierChamp(champ, message){
    if(champ.value.trim() === ""){
        showError(champ, message);
        return false;
    } else {
        showSuccess(champ);
        return true;
    }
}

// Vérifier email
function validerEmail(){
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email.value.trim())){
        showError(email, "Email invalide");
        return false;
    } else {
        showSuccess(email);
        return true;
    }
}

// Vérifier mot de passe
function validerPassword(){
    if(password.value.trim().length < 6){
        showError(password, "Minimum 6 caractères");
        return false;
    } else {
        showSuccess(password);
        return true;
    }
}

// Vérifier genre
function validerGenre(){
    let selected = document.querySelector('input[name="genre"]:checked');
    let small = document.querySelector('input[name="genre"]').parentElement.querySelector('small');
    if(!selected){
        small.innerText = "Sélectionnez un genre";
        return false;
    } else {
        small.innerText = "";
        return true;
    }
}

// Vérifier conditions
function validerConditions(){
    let small = conditions.nextElementSibling;
    if(!conditions.checked){
        small.innerText = "Vous devez accepter les conditions";
        return false;
    } else {
        small.innerText = "";
        return true;
    }
}

// Évènements blur/change
nom.addEventListener("blur", ()=> verifierChamp(nom, "Nom obligatoire"));
prenom.addEventListener("blur", ()=> verifierChamp(prenom, "Prénom obligatoire"));
email.addEventListener("blur", validerEmail);
password.addEventListener("blur", validerPassword);
date.addEventListener("blur", ()=> verifierChamp(date, "Date obligatoire"));
ville.addEventListener("change", ()=> verifierChamp(ville, "Choisissez une ville"));

// Soumission du formulaire
form.addEventListener("submit", function(e){
    e.preventDefault();

    if(!verifierChamp(nom,"Nom obligatoire") ||
       !verifierChamp(prenom,"Prénom obligatoire") ||
       !validerEmail() ||
       !validerPassword() ||
       !verifierChamp(date,"Date obligatoire") ||
       !verifierChamp(ville,"Choisissez une ville") ||
       !validerGenre() ||
       !validerConditions()){
        alert("Veuillez corriger les erreurs");
        return;
    }

    // Collecter données
    let user = {
        nom: nom.value.trim(),
        prenom: prenom.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        date: date.value,
        genre: document.querySelector('input[name="genre"]:checked').value,
        ville: ville.value,
        conditions: conditions.checked ? "Oui" : "Non"
    };

    utilisateurs.push(user);
    afficherTable();
    form.reset();

    // Enlever les classes de validation
    [nom, prenom, email, password, date, ville].forEach(champ=>{
        champ.classList.remove("is-valid");
    });
});

// Afficher table
function afficherTable(){
    table_body.innerHTML = "";
    utilisateurs.forEach(u=>{
        let ligne = `<tr>
            <td>${u.nom}</td>
            <td>${u.prenom}</td>
            <td>${u.email}</td>
            <td>${u.password}</td>
            <td>${u.date}</td>
            <td>${u.genre}</td>
            <td>${u.ville}</td>
            <td>${u.conditions}</td>
        </tr>`;
        table_body.insertAdjacentHTML("beforeend", ligne);
    });
}