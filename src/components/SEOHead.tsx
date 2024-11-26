import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

export function SEOHead({ 
  title,
  description,
  image = 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000',
  url = window.location.href,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Günlük İyi İşler',
  keywords = [
    'iyilik',
    'sosyal sorumluluk',
    'toplum',
    'hayvanlar',
    'çevre',
    'yardımlaşma',
    'gönüllülük',
    'sosyal etki',
    'toplumsal fayda',
    'iyilik platformu'
  ]
}: SEOHeadProps) {
  const { t } = useTranslation();
  const siteName = t('site.title');
  const defaultDescription = t('site.description');

  const siteTitle = title ? `${title} | ${siteName}` : siteName;
  const finalDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="tr" />
      <title>{siteTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@gunlukiyiisler" />
      <meta name="twitter:creator" content="@gunlukiyiisler" />

      {/* Additional Article Tags */}
      {type === 'article' && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author} />
          <meta property="article:section" content="İyi İşler" />
          <meta property="article:tag" content={keywords.join(', ')} />
        </>
      )}

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#f43f5e" />
      <link rel="canonical" href={url} />

      {/* Schema.org Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'website' ? "WebSite" : "Article",
          "name": siteName,
          "headline": title,
          "description": finalDescription,
          "url": url,
          "image": image,
          "author": {
            "@type": "Organization",
            "name": author
          },
          "publisher": {
            "@type": "Organization",
            "name": siteName,
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/heart.svg`
            }
          },
          "datePublished": publishedTime,
          "dateModified": modifiedTime || publishedTime,
          "inLanguage": "tr-TR"
        })}
      </script>
    </Helmet>
  );
}