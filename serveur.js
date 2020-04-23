const express = require('express'); // Importation d'express
const path = require('path'); // Importation de path
const fs = require('fs'); // Importation de fs (File System)

const app = express(); // Initialisation de app 
const PORT = process.env.PORT || 5000; // Initialisation du port avec le fichier env ou 5000 par défaut.

// Récupération de la vidéo via la route /video
app.get('/videos/:nom/:code', (req, res) => {
        let les_videos = fs.readFileSync(new URL('file:'+path.join(__dirname, 'videos.json'))); // Récupération du fichier videos.json
        les_videos = JSON.parse(les_videos); // Transformation en chaîne de caractères
        let good = false; // Création d'une variable permettant de savoir si il y a ou non correspondance (pour savoir quoi retourné)
        for(i=0; i<les_videos.length; i++)
        {
            if(les_videos[i].nom == req.params.nom && les_videos[i].code == req.params.code) // Si le nom correspond
            {        
                good = true; // Indique que l'accès est autorisé
            }
        }
        if(good) res.sendFile(path.join(__dirname, 'videos', req.params.nom+'.mp4')); // Si l'accès est autorisé renvoie la vidéo
            else res.send("err"); // Sinon renvoie "err"
    }
);

app.use(express.static(path.join(__dirname, 'public'))); // Mise en place d'un dossier statique

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Lancement du serveur, lance la fonction en paramètre au passage.