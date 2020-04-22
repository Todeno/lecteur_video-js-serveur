let video = document.querySelector('.video'); // Récupération de la balise vidéo de l'html (class="video")
let bouton_mute = document.getElementById('mute'); // Récupération de la balise correspondant au bouton mute de l'html (id="mute")


video.play(); // Lancement de la vidéo


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
)