import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

const SITE_NAME = "Jennifer Mello, LICSW";
const BASE_URL = "https://jmellolicsw.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/hero-bg.png`;

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: "Jennifer Mello, LICSW",
  description:
    "Certified trauma therapist specializing in holistic health and wellness therapy for adolescents and adults in Plymouth, MA.",
  url: BASE_URL,
  telephone: "+15085910569",
  email: "jmellolicsw@gmail.com",
  image: `${BASE_URL}/images/hero-bg.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "225 Water Street, Suite B239",
    addressLocality: "Plymouth",
    addressRegion: "MA",
    postalCode: "02360",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.9584,
    longitude: -70.6673,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  priceRange: "$$",
  sameAs: ["https://www.instagram.com/jennifermellolicsw/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Therapy Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Trauma Therapy",
          description:
            "Certified trauma therapy using holistic and relational approaches.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Individual Therapy",
          description:
            "Individual therapy for anxiety, depression, and emotional regulation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Family Consultation",
          description:
            "Family consultation and support for relationship challenges.",
        },
      },
    ],
  },
};

export function SEO({
  title,
  description,
  path = "",
  ogImage,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
}
