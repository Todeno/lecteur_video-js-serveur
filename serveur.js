const express = require('express'); // Importation d'express
const path = require('path'); // Importation de path

const app = express(); // Initialisation de app 
const PORT = process.env.PORT || 5000; // Initialisation du port avec le fichier env ou 5000 par défaut.

/*
// Gestion de la route / (la racine)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/

// Mise en place d'un dossier statique
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Lancement du serveur, lance la fonction en paramètre au passage.