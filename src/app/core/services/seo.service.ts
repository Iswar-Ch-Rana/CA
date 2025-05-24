import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ConfigService } from './config.service';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private defaultSEO: any;

  constructor(
    private meta: Meta,
    private title: Title,
    private configService: ConfigService
  ) {
    this.defaultSEO = this.configService.getSEO();
  }

  updateSEO(data: SEOData) {
    // Update title
    const pageTitle = data.title
      ? `${data.title} | ${this.defaultSEO.siteName}`
      : this.defaultSEO.defaultTitle;
    this.title.setTitle(pageTitle);

    // Update meta description
    const description = data.description || this.defaultSEO.defaultDescription;
    this.meta.updateTag({ name: 'description', content: description });

    // Update keywords
    const keywords = data.keywords?.join(', ') || this.defaultSEO.defaultKeywords.join(', ');
    this.meta.updateTag({ name: 'keywords', content: keywords });

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.defaultSEO.siteName });

    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }

    if (data.url) {
      this.meta.updateTag({ property: 'og:url', content: data.url });
    }

    // Update Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    if (this.defaultSEO.twitterHandle) {
      this.meta.updateTag({ name: 'twitter:site', content: this.defaultSEO.twitterHandle });
    }

    if (data.image) {
      this.meta.updateTag({ name: 'twitter:image', content: data.image });
    }

    // Update article specific tags
    if (data.type === 'article') {
      if (data.author) {
        this.meta.updateTag({ property: 'article:author', content: data.author });
      }
      if (data.publishedTime) {
        this.meta.updateTag({ property: 'article:published_time', content: data.publishedTime });
      }
      if (data.modifiedTime) {
        this.meta.updateTag({ property: 'article:modified_time', content: data.modifiedTime });
      }
    }

    // Update canonical URL
    if (data.url) {
      this.updateCanonicalUrl(data.url);
    }
  }

  private updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  generateStructuredData(type: 'Organization' | 'LocalBusiness' | 'Article' | 'Service', data: any) {
    const config = this.configService.getConfig();

    let structuredData: any = {
      '@context': 'https://schema.org',
      '@type': type
    };

    switch (type) {
      case 'Organization':
      case 'LocalBusiness':
        structuredData = {
          ...structuredData,
          name: config.branding.companyName,
          description: config.seo.defaultDescription,
          url: data.url || window.location.origin,
          logo: data.logo || `${window.location.origin}/${config.branding.logo}`,
          telephone: config.contact.phone,
          email: config.contact.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: config.contact.address,
            addressLocality: config.contact.city,
            addressRegion: config.contact.state,
            postalCode: config.contact.zipCode,
            addressCountry: config.contact.country
          },
          sameAs: Object.values(config.contact.socialMedia).filter(Boolean),
          foundingDate: config.business.establishedYear.toString(),
          ...data
        };
        break;

      case 'Article':
        structuredData = {
          ...structuredData,
          headline: data.title,
          description: data.description,
          author: {
            '@type': 'Organization',
            name: config.branding.companyName
          },
          publisher: {
            '@type': 'Organization',
            name: config.branding.companyName,
            logo: {
              '@type': 'ImageObject',
              url: `${window.location.origin}/${config.branding.logo}`
            }
          },
          datePublished: data.publishedTime,
          dateModified: data.modifiedTime || data.publishedTime,
          ...data
        };
        break;

      case 'Service':
        structuredData = {
          ...structuredData,
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: config.branding.companyName
          },
          areaServed: {
            '@type': 'Country',
            name: config.contact.country
          },
          ...data
        };
        break;
    }

    this.addStructuredDataToHead(structuredData);
  }

  private addStructuredDataToHead(structuredData: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}
