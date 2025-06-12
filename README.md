# Librairie du system design des Bibliothèques de l'Université de Montréal

## Utilisation

Cette librairie n'exporte pas pour l'instant de module pour le _custom element_ `bib-avis`. La seule façon d'utiliser ce composant est d'importer le module à l'aide d'un élément `<script type="module"></script>`

### Via CDN

```
<script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-avis.js"></script>
```

puis, insérez le custom element:

```
<bib-avis bouton-fermer></bib-avis>
```

### Le composant `<bib-consent>`

Il faut temporairement ajouter une configuration à l'élément afin d'allonger le temps d'attente à 5000 millisecondes pour une réponse de la part du composant serveur:

`<bib-consent server-request-timeout="5000"></bib-consent>`

Cette configuration sera enlevée lors de la publication de la version 1.0.0 de la librairie.

## Documentation

La documentation des composants est gérée à l'aide de [Storybook](https://storybook.js.org/) et publiée sur GitHub Pages:

[https://bibudem.github.io/ui](https://bibudem.github.io/ui/)

## Pour créer un `release`

Exécuter la commande suivante, en adaptant le niveau de version en fonction des commits faits depuis le dernier `release`:

```
npm version minor -m "Bump v%s"
```

Effectuer un commit des fichiers build, avec un message du genre:

```
git add --all dist && git commit -m "Build pour v0.13.0" -m "Release-As: 0.13.0" && git push
```

Puis naviguer sur les [pull requests du dépôt GitHub](https://github.com/bibudem/ui/pulls) et acceptez le pull request généré par _Release Please_.
