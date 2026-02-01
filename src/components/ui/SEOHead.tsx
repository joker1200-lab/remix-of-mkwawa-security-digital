import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const SEOHead = ({
  title,
  description,
  keywords = 'security services, security guards, CCTV, armed response, Tanzania, Dar es Salaam, Mkwawa Security',
  canonicalUrl,
  ogImage = '/og-image.jpg',
}: SEOHeadProps) => {
  const fullTitle = `${title} | Mkwawa Security Co. Ltd`;
  const siteUrl = 'https://mkwawasecurity.co.tz';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Mkwawa Security Co. Ltd" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      {canonicalUrl && <meta property="og:url" content={`${siteUrl}${canonicalUrl}`} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={`${siteUrl}${canonicalUrl}`} />}

      {/* Geo Tags */}
      <meta name="geo.region" content="TZ-DA" />
      <meta name="geo.placename" content="Dar es Salaam" />
      <meta name="geo.position" content="-6.8829;39.2859" />
      <meta name="ICBM" content="-6.8829, 39.2859" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SecurityService',
          name: 'Mkwawa Security Co. Ltd',
          description: 'Professional security services in Tanzania including armed guards, CCTV systems, and VIP protection.',
          url: siteUrl,
          telephone: '+255788222899',
          email: 'info@mkwawasecurity.co.tz',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'EAGT Building, Nyerere Rd, Bohari Street',
            addressLocality: 'Dar es Salaam',
            addressRegion: 'Ilala',
            addressCountry: 'TZ',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -6.8829,
            longitude: 39.2859,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
          sameAs: [],
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
