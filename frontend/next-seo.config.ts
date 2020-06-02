export default {
  title: 'Un site carrière focus candidats et pour marque employeur',
  titleTemplate: 'Kernn | %s',
  description: "Kernn est une démonstration concrète des solutions que nous proposons à nos clients afin de développer leur marque employeur et d'optimiser les performances.",
  canonical: 'https://kernn.io',
  defaultOpenGraphImageHeight: 630,
  defaultOpenGraphImageWidth: 1200,
  mobileAlternate: {
    media: 'only screen and (max-width: 640px)',
    href: 'https://kernn.io'
  },
  // languageAlternate: {
  //   hrefLang: 'en-US',
  //   href: 'https://kernn.io/en'
  // },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://kernn.io',
    site_name: 'Kernn',
    title: 'Un site carrière focus candidats et pour marque employeur',
    description: "Kernn est une démonstration concrète des solutions que nous proposons à nos clients afin de développer leur marque employeur et d'optimiser les performances.",
    // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next
    images: [
      {
        url: "https://res.cloudinary.com/angulaire/image/upload/c_scale,h_630,w_1200/v1583946211/og-image_z2da8w.png",
        width: 1200,
        height: 630,
        alt: 'Kernn Meta',
      }
    ]
  },
  // twitter: {
  //   handle: '@handlea',
  //   site: '@sitea',
  //   cardType: 'summary_large_image'
  // },
  // facebook: {
  //   appId: '1234567890'
  // }
};