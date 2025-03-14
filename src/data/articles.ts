interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  publishDate: string;
  author: Author;
  image: string;
  readingTime: number;
  content: string;
  tags: string[];
}

export const getAllArticles = (): Article[] => {
  return [
    {
      slug: 'art-perlage-benin',
      title: "L'art du perlage au Bénin : Une tradition millénaire",
      category: "Artisanat",
      publishDate: "2024-03-15",
      author: {
        name: "Aline Assogba",
        avatar: "/img/authors/aline.jpg",
        bio: "Experte en artisanat traditionnel béninois et conservatrice au Musée d'Histoire de Ouidah"
      },
      image: "/img/blog/perlage-benin.jpg",
      readingTime: 12,
      content: `
        L'art du perlage au Bénin est bien plus qu'une simple technique artisanale...
        [Votre contenu détaillé ici]
      `,
      tags: ["Artisanat", "Culture", "Tradition", "Savoir-faire"]
    },
    {
      slug: 'traditions-vodoun-benin',
      title: "Les traditions vodoun au Bénin : un héritage vivant",
      category: "Culture",
      publishDate: "2024-03-10",
      author: {
        name: "Marie Houénou",
        avatar: "/img/authors/marie.jpg",
        bio: "Anthropologue spécialisée dans les traditions vodoun"
      },
      image: "/img/blog/vodoun-traditions.jpg",
      readingTime: 15,
      content: `
        Les traditions vodoun constituent l'un des piliers de la culture béninoise...
        [Votre contenu détaillé ici]
      `,
      tags: ["Vodoun", "Culture", "Tradition", "Spiritualité"]
    },
    {
      slug: 'gastronomie-beninoise',
      title: "Les saveurs authentiques de la cuisine béninoise",
      category: "Gastronomie",
      publishDate: "2024-03-05",
      author: {
        name: "Sophie Dossou",
        avatar: "/img/authors/sophie.jpg",
        bio: "Chef cuisinière et spécialiste de la gastronomie béninoise"
      },
      image: "/img/blog/cuisine-benin.jpg",
      readingTime: 10,
      content: `
        La cuisine béninoise est un véritable voyage des sens...
        [Votre contenu détaillé ici]
      `,
      tags: ["Gastronomie", "Culture", "Tradition", "Cuisine"]
    }
  ];
}; 