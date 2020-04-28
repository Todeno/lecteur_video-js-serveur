import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

let video = document.getElementById('rjsvp_video'); // Récupération de la balise vidéo de l'html (class="video")
let bouton_search = document.getElementById('bouton_searchVideo'); // Récupération du bouton de recherche de vidéo (id="bouton_searchVideo")
let input_nom = document.getElementById('input_nomVideo'); // Récupération du textfield de recherche de vidéo (id="input_nomVideo")
let input_code = document.getElementById('input_codeVideo'); // Récupération du textfield correspondant au code secret de la vidéo (id="input_codeVideo")
let text_error = document.querySelector('.error'); // Récupération du texte d'erreur (class="class=error")
let player_interface = document.getElementById('rjsvp_player_interface'); // Récupération de la div contenant le lecteur

const http = new XMLHttpRequest(); // Déclaration de l'élément http

player_interface.attributes.style.value = "display:none";

input_nom.focus(); // A l'arrivé sur la page, le champ est selectionné

// Ajout d'un évènement en cas de pression sur entré dans le champ pour le nom de la vidéo
input_nom.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) input_code.focus(); // Si la touche 13 (entré) est pressé, passe le focus sur la champ suivant
  }
); 

// Ajout d'un évènement en cas de pression sur entré dans le champ pour le code secret
input_code.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) bouton_search.click(); // Si la touche 13 (entré) est pressé, clique sur le bouton
  }
); 


// Ajout d'un evenement au bouton de recherche de vidéo
bouton_search.addEventListener
(
    'click', function()
    {
        http.open('GET', "videos/"+input_nom.value+"/"+input_code.value); // On récupère la page renvoyant le fichier vidéo (ou non)
        http.send(); // On envoie la requete
        http.onreadystatechange = function(){ // Lorsque l'état change
            if(this.readyState===4 && this.status===200) // Si la requête est terminée et ne renvoie pas d'erreur
            {
                if(http.responseText.length > 3) // Si la réponse est supérieur à 0 (si un fichier vidéo a été renvoyé)
                {
                    http.abort(); // Fermeture de la requete préalablement ouverte
                    video.attributes.src.value = "videos/"+input_nom.value+"/"+input_code.value; // Attribution d'une valeur à l'attribut src de la vidéo
                    text_error.style = "display:none";
                    player_interface.attributes.style.value = 'display:flex'; // Affichage du lecteur
                    bouton_search.attributes.style.value = 'display:none'; // On cache ensuite le bouton
                    input_nom.value=""; // Vidage du textfield (en cas de refresh)
                    input_code.value=""; // de même
                    input_nom.attributes.style.value = 'display:none'; // Puis on cache le textfield
                    input_code.attributes.style.value = 'display:none'; // de même
                    video.play(); // Lancement de la vidéo
                    video.volume = 0.5; // Initialisation du volume à 50% (en accord avec la valeur initiale du volume slider)
                }
                else if(http.responseText === "err") text_error.style = "display:flex";
            }
        }        
    }
);