# Prépa SA interministériel 2027

Application web installable (PWA) de préparation au concours commun interne de secrétaire administratif de classe normale (fonction publique de l'État), session 2027.

Créé par G. FUMONT · FMT Collaboration.

- `index.html` : l'application.
- `free-data.js` : contenus en accès libre.
- `contenu.enc` : contenus de la version complète, chiffrés avec la clé du gestionnaire et publiés par lui dans Firestore (collection `sacn_contenu`), lisibles pendant l'essai de 7 jours ou avec un abonnement actif.
- `admin.enc` : tableau des accès, réservé au gestionnaire.
- `veille/` : synthèses quotidiennes d'actualité ; les fiches détaillées sont chiffrées (clé `config/sacn_cle`).

Le projet Firebase est partagé avec les applications Prépa Attaché AAE 2027 et Prépa SA Ville de Paris 2027 ; les comptes, essais, abonnements et contenus de cette application sont dans des collections distinctes (`sacn_comptes`, `sacn_abonnes`, `sacn_contenu`, `config/sacn_cle`, `config/sacn_paiement`, `users/{uid}/data/sacn_progress`). Le fichier `firestore.rules` contient les règles communes aux trois applications.
