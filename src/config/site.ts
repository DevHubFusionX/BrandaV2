export interface SiteConfig {
  name: string;
  subname: string;
  tagline: string;
  description: string;
  url: string;
  announcement: string;
  phone: string;
  email: string;
  ogImage: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  links: {
    twitter: string;
    instagram: string;
    linkedin: string;
    whatsapp: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'branda',
  subname: 'Digital by Branda',
  tagline: 'Integrated Branding, Printing & Corporate Gifting Ecosystem',
  description:
    'Powering ambitious companies across Nigeria and Africa with high-precision custom merchandise, curated corporate gift boxes, print collateral, and packaging.',
  url: 'https://branda.com.ng',
  announcement:
    '⚡ Fast Nationwide Delivery across Lagos, Abuja & 36 States | Corporate Invoicing Available',
  phone: '+234 800 BRANDANG',
  email: 'hello@branda.com.ng',
  ogImage: 'https://branda.com.ng/og.png',
  contact: {
    phone: '+234 800 BRANDANG',
    email: 'hello@branda.com.ng',
    address: 'Victoria Island, Lagos, Nigeria',
  },
  links: {
    twitter: 'https://twitter.com/brandang',
    instagram: 'https://instagram.com/brandang',
    linkedin: 'https://linkedin.com/company/branda-ng',
    whatsapp: 'https://wa.me/2348000000000',
  },
};
