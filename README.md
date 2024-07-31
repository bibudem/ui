# Librairie du system design des Bibliothèques de l'Université de Montréal

**_Version préliminaire_**

## Utilisation

Cette librairie n'exporte pas pour l'instant de module pour le _custom element_ `bib-avis`. La seule façon d'utiliser ce composant est d'importer le module à l'aide d'un élément `<script type="module"></script>`

### Via CDN

`<script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-avis.js"></script>`

puis, insérez le custom element:

`<bib-avis bouton-fermer></bib-avis>`

## Documentation

La documentation des composants est gérée à l'aide de [Storybook](https://storybook.js.org/) et publiée sur GitHub Pages:

[https://bibudem.github.io/ui](https://bibudem.github.io/ui/)

## Pour créer un `release`

Exécuter la commande suivante, en adaptant le niveau de version en fonction des commits faits depuis le dernier `release`:

```
npm version minor -m "Bump v%s" -m "Release-As: 0.13.0"
```

Puis naviguer sur les [pull requests du dépôt GitHub](https://github.com/bibudem/ui/pulls) et acceptez le pull request généré par Release Please.
