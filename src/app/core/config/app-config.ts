export interface AppConfig {
  branding: {
    companyName: string;
    tagline: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    socialMedia: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
      instagram?: string;
      youtube?: string;
    };
  };
  business: {
    establishedYear: number;
    registrationNumber: string;
    gstNumber: string;
    panNumber: string;
    services: string[];
    specializations: string[];
  };
  features: {
    chatbot: boolean;
    appointment: boolean;
    newsletter: boolean;
    blog: boolean;
    calculators: boolean;
    clientPortal: boolean;
    multiLanguage: boolean;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
    siteName: string;
    twitterHandle?: string;
    facebookAppId?: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    facebookPixelId?: string;
  };
}

export const APP_CONFIG: AppConfig = {
  branding: {
    companyName: 'Patra & Associates',
    tagline: 'Your Trusted Financial Partner',
    logo: 'assets/images/logo.png',
    favicon: 'assets/images/favicon.ico',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    accentColor: '#f37316'
  },
  contact: {
    phone: '+91-9040529121',
    email: 'info@patraassociates.com',
    address: 'Udala, Mayurbhanj',
    city: 'Udala',
    state: 'Odisha',
    zipCode: '757041',
    country: 'India',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/patraassociates',
      twitter: 'https://twitter.com/excellenceca',
      facebook: 'https://facebook.com/excellenceca',
      instagram: 'https://instagram.com/excellenceca',
      youtube: 'https://youtube.com/@excellenceca'
    }
  },
  business: {
    establishedYear: 2010,
    registrationNumber: 'CA-REG-2010-001',
    gstNumber: '27XXXXX1234X1ZX',
    panNumber: 'ABCDE1234F',
    services: [
      'Tax Planning & Preparation',
      'Audit & Assurance',
      'Business Advisory',
      'Bookkeeping & Accounting',
      'Company Registration',
      'GST Services',
      'Financial Planning',
      'Compliance Management'
    ],
    specializations: [
      'Corporate Tax',
      'International Taxation',
      'Transfer Pricing',
      'Mergers & Acquisitions',
      'Financial Restructuring',
      'Risk Management'
    ]
  },
  features: {
    chatbot: true,
    appointment: true,
    newsletter: true,
    blog: true,
    calculators: true,
    clientPortal: false, // Future enhancement
    multiLanguage: false // Future enhancement
  },
  seo: {
    defaultTitle: 'Excellence CA & Associates - Professional Chartered Accountant Services',
    defaultDescription: 'Leading Chartered Accountant firm providing comprehensive tax, audit, and business advisory services. Expert CA services for individuals and businesses.',
    defaultKeywords: [
      'chartered accountant',
      'CA services',
      'tax planning',
      'audit services',
      'business advisory',
      'GST services',
      'company registration',
      'financial planning'
    ],
    siteName: 'Excellence CA & Associates',
    twitterHandle: '@excellenceca'
  },
  analytics: {
    googleAnalyticsId: 'GA_MEASUREMENT_ID', // Replace with actual ID
    googleTagManagerId: 'GTM_CONTAINER_ID' // Replace with actual ID
  }
};
