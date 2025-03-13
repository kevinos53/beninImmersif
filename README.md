# Bénin Immersion 🌍



## 🌟 Présentation

Bénin Immersion est une plateforme web immersive dédiée à la promotion du tourisme au Bénin. Ce site offre une expérience utilisateur captivante qui met en valeur les richesses culturelles, naturelles et gastronomiques du pays, avec un accent particulier sur la culture vodou et les traditions ancestrales béninoises.

**🔗 [Voir le site en ligne](https://benin-immersif.vercel.app/)**  
**🔗 [Dépôt GitHub](https://github.com/kevinos53/beninImmersif)**

## ✨ Caractéristiques

- **Design immersif** : Animations fluides et transitions élégantes inspirées de l'aspect mystique du vodou béninois
- **Expérience interactive** : Effets de parallaxe, animations au défilement et interactions utilisateur avancées
- **Sections thématiques** :
  - 🏛️ **Culture** : Découverte des traditions, de l'histoire et du vodou béninois
  - 🌿 **Nature** : Exploration des parcs nationaux et des paysages naturels
  - 🧠 **Expériences** : Activités et expériences touristiques uniques
  - 🍲 **Gastronomie** : Plats traditionnels et spécialités culinaires
  - 📞 **Contact** : Formulaire de contact et informations pratiques
- **Navigation intuitive** : Menu de navigation avec défilement fluide et animations
- **Responsive design** : Expérience optimisée sur tous les appareils (desktop, tablette, mobile)

## 🛠️ Technologies utilisées

- **Frontend** :
  - [Astro](https://astro.build/) - Framework web moderne et performant
  - [Vue.js](https://vuejs.org/) - Framework JavaScript progressif
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
  - [GSAP](https://greensock.com/gsap/) - Bibliothèque d'animation JavaScript
  - [FontAwesome](https://fontawesome.com/) - Bibliothèque d'icônes

- **Optimisation** :
  - Lazy loading des images et composants
  - Animations optimisées pour les performances
  - Chargement progressif du contenu

## 🎨 Palette de couleurs

Le design utilise une palette inspirée des couleurs nationales du Bénin (vert, jaune, rouge) enrichie de teintes violettes représentant la spiritualité :

- `benin-green` : Couleur principale du site
- `benin-yellow` : Accents et appels à l'action
- `benin-red` : Points d'attention
- `vodou` : Sections liées à la spiritualité
- `night` et `spirit` : Arrière-plans sombres

## 🚀 Installation et démarrage

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/kevinos53/beninImmersif.git
cd benin-immersion
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

3. Lancez le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```

4. Ouvrez votre navigateur à l'adresse : `http://localhost:3000`

### Build pour la production

```bash
npm run build
# ou
yarn build
```

## 📝 Structure du projet

```
benin-immersion/
├── public/              # Ressources statiques (images, fonts)
├── src/
│   ├── components/      # Composants Vue réutilisables
│   │   ├── sections/    # Sections principales du site
│   │   └── ui/          # Composants d'interface utilisateur
│   ├── layouts/         # Layouts Astro
│   ├── pages/           # Pages Astro
│   └── styles/          # Styles globaux
├── astro.config.mjs     # Configuration Astro
├── tailwind.config.js   # Configuration Tailwind CSS
└── package.json         # Dépendances et scripts
```

## 🌟 Fonctionnalités principales

### Animations immersives

Le site utilise GSAP pour créer des animations fluides et captivantes qui évoquent l'aspect mystique du vodou béninois. Les animations sont déclenchées au défilement, au survol ou lors d'interactions utilisateur.

### Navigation interactive

La navigation permet un défilement fluide vers les différentes sections du site, avec des effets visuels qui améliorent l'expérience utilisateur.

### Effets de parallaxe

Des effets de parallaxe sont utilisés pour créer une sensation de profondeur et d'immersion, notamment dans les sections héro et gastronomie.

### Responsive design

Le site est entièrement responsive et offre une expérience optimale sur tous les appareils, des grands écrans de bureau aux smartphones.


## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.



---

Développé avec ❤️ pour promouvoir le tourisme au Bénin
