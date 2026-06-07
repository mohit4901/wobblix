import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteName = 'Wobblix Clothing';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Premium Gen-Z Streetwear`;
  const siteUrl = 'https://wobblixclothing.in';
  const currentUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultDescription = 'Shop the ultimate Gen-Z streetwear collection at Wobblix Clothing. Premium oversized t-shirts and tank tops.';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || '/logo1.png'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || '/logo1.png'} />
    </Helmet>
  );
};

export default SEO;
