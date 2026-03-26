# Weather App

Application d'affichage météo destinée aux écrans d'information dans les stations et véhicules de transports en commun de plusieurs villes de taille moyenne en France.

## Contexte

Cette application est basée sur une application météo existante : https://github.com/madzadev/weather-app, sous licence MIT. Elle est adaptée dans le cadre d'un contrat agence pour répondre aux besoins spécifiques des réseaux de transport de plusieurs villes. Les écrans étant embarqués via webview et destinés à un affichage public en continu, il n'y a pas d'interaction utilisateur avec l'interface, la ville est configurée par l'opérateur de transport.


## Stack technique

    - Next.js 16,
    - React 19
    - API Open-Meteo
    - CSS Modules


## Installation

1. `git clone https://github.com/Melb56/Weather-app`
2. `cd weather-app`
3. `npm install`
4. `npm run dev`


## Configuration de la ville

Créer le fichier `config.json` à la racine du projet et renseigner le nom de la ville.

{
  "city": "Nantes"
}


## Fonctionnalités

- Affichage conçu pour des écrans fixes sans interaction utilisateur
- Les données sont rafraîchies toutes les heures
- Affiche la température et l'humidité
- Affiche la vitesse du vent et sa direction
- Affiche l'heure du lever et du coucher de soleil
- Changement pour système métrique ou impérial


## Changements effectués par rapport au projet d'origine

- Migration d'API OpenWeatherMap vers Open-Meteo : réécriture complète de `data.js`
- Ajout du fichier `wmo.js` pour adapter les données d'Open-Meteo au reste de l'application écrit pour OpenWeatherMap
- Ajout du fichier de configuration de la ville : création de `config.json` et ajout lien dans `data.js`
- Suppression de la barre de recherche : `cityInput`, `triggerFetch` et `<Search />` retirés de `index.js`; composant `Search` supprimé
- Heure en temps réel : ajout de setInterval dans `DateAndTime.js` 
- Rafraîchissement toutes les heures : ajout de `setInterval` dans `index.js`
- Ajout de `loading="eager"` et `priority` sur l'icône météo de `MainCard.js`


## Améliorations possibles

- Changer l'architecture, migrer de Page Router à App Router
- Ecrire le code en TypeScript au lieu du JavaScript
- Afficher les prévisions sur plusieurs heures
- Détection automatique du fuseau horaire selon la ville
- Traduction des descriptions météo en français
    
    
