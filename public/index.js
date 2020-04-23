let video = document.querySelector('.video'); // Récupération de la balise vidéo de l'html (class="video")
let bouton_mute = document.getElementById('mute'); // Récupération de la balise correspondant au bouton mute de l'html (id="mute")
let volume_slider = document.getElementById('volumeSlider'); // Récupération de la balise correspondant au volume slider (id="volumeSlider")
let progression = document.getElementById('progression'); // Récupération de la balise correspondant à la barre de progression (id="progression")
let bouton_search = document.getElementById('bouton_searchVideo'); // Récupération du bouton de recherche de vidéo (id="bouton_searchVideo")
let player_interface = document.querySelector('.player_interface'); // Récupération de la balise vidéo de l'html (class="player_interface")
let input_nom = document.getElementById('input_nomVideo'); // Récupération du textfield de recherche de vidéo (id="input_nomVideo")
let input_code = document.getElementById('input_codeVideo'); // Récupération du textfield correspondant au code secret de la vidéo (id="input_codeVideo")


// Ajout d'un evenement au bouton de recherche de vidéo
bouton_search.addEventListener
(
    'click', function()
    {
        video.attributes.src.value = "http://localhost:5000/videos/"+input_nom.value+"/"+input_code.value; // Attribution d'une valeur à l'attribut src de la vidéo
        player_interface.attributes.style.value = 'display:flex'; // Affichage du lecteur
        bouton_search.attributes.style.value = 'display:none'; // On cache ensuite le bouton
        input_nom.value=""; // Vidage du textfield (en cas de refresh)
        input_code.value=""; // de même
        input_nom.attributes.style.value = 'display:none'; // Puis on cache le textfield
        input_code.attributes.style.value = 'display:none'; // de même
        video.play(); // Lancement de la vidéo
        video.volume = 0.5; // Initialisation du volume à 50% (en accord avec la valeur initiale du volume slider)
    }
);

// Ajout d'un evenement au bouton mute
bouton_mute.addEventListener
(
    'click', function()
    {
        if(video.muted) // Si la vidéo est déjà muté
        {
            video.muted = false; // La démute
            bouton_mute.innerHTML = "Mute"; // Puis change le texte du bouton
        } 
        else // Si le son de la vidéo est toujours activé
        {
            video.muted = true; // La mute
            bouton_mute.innerHTML = "Démute"; // Puis change le texte du bouton
        }
    }
);

// Ajout d'un evenement au volume slider
volume_slider.addEventListener
(
    'change', function()
    {
        video.volume = volume_slider.value / 100; // Suite à un changement de valeur, le volume de la vidéo devient égale à la nouvelle valeur (divisé par 100 car on veut %)
    }
);

// Ajout d'un evenement à la vidéo
video.addEventListener
(
    'timeupdate', function()
    {
        let position = video.currentTime / video.duration;
        progression.style.width = (video.currentTime / video.duration)* 100 + '%'; // La barre prend la taille du temps écoulé en %
    }
);