export interface NavSubItem {
  title: string;
  description: string;
  href: string;
}

export interface NavItemConfig {
  title: string;
  href: string;
  isMegaMenu?: boolean;
  items?: NavSubItem[];
}

export const navigationConfig: NavItemConfig[] = [
  {
    title: 'Products',
    href: '/shop',
    isMegaMenu: true,
  },
  {
    title: 'Solutions',
    href: '/solutions',
    items: [
      {
        title: 'For HR & People Teams',
        description: 'Automated employee welcome packs, milestone rewards, and distributed swag closets.',
        href: '/solutions/hr-teams',
      },
      {
        title: 'For Marketing & Event Teams',
        description: 'Conference packs, event banners, premium collateral, and rapid exhibition setup.',
        href: '/solutions/marketing-events',
      },
      {
        title: 'For Startups & Scaleups',
        description: 'Brand launch packs, high-impact merch, and fast Lagos turnaround.',
        href: '/solutions/startups',
      },
      {
        title: 'For Enterprise Procurement',
        description: 'VAT/WHT compliant invoicing, volume tier pricing, and dedicated account management.',
        href: '/solutions/enterprise',
      },
    ],
  },
  {
    title: 'Platform',
    href: '/platform',
    items: [
      {
        title: 'Brand Vault™ Asset Storage',
        description: 'Centralized cloud storage for company vector logos, color palettes, and typography.',
        href: '/platform#brand-vault',
      },
      {
        title: '3D Virtual Proofing Engine',
        description: 'Review digital 3D mockups and approve print proofs before manufacturing.',
        href: '/platform#proofing',
      },
      {
        title: 'Lagos Warehousing & Hub',
        description: 'Store inventory in our Lagos warehouse and dispatch nationwide on demand.',
        href: '/platform#warehousing',
      },
    ],
  },
  {
    title: 'Pricing',
    href: '/pricing',
    items: [
      {
        title: 'Volume Pricing Matrix',
        description: 'Transparent tiered discounts for orders from 25 to 10,000+ units.',
        href: '/pricing#calculator',
      },
      {
        title: 'Corporate Net-30 Invoicing',
        description: 'Proforma POs, VAT/WHT compliance, and credit terms for corporate clients.',
        href: '/pricing#corporate',
      },
    ],
  },
  {
    title: 'Resources',
    href: '/resources',
    items: [
      {
        title: 'Artwork Prep Guidelines',
        description: 'Vector formats (AI, EPS, PDF), CMYK color profiles, and bleed margins.',
        href: '/resources/artwork-guidelines',
      },
      {
        title: 'Print Finishes & Materials',
        description: 'Compare Spot UV, Gold Foil, Debossing, and 600gsm luxury paper stocks.',
        href: '/resources/finishes-guide',
      },
      {
        title: 'Customer Stories',
        description: 'How top Nigerian startups, banks, and enterprises scale their physical branding.',
        href: '/resources/case-studies',
      },
    ],
  },
  {
    title: 'Company',
    href: '/company',
    items: [
      {
        title: 'About Branda',
        description: 'Our mission to modernize branding, printing, and corporate gifting across Africa.',
        href: '/company/about',
      },
      {
        title: 'Studio by Branda',
        description: 'In-house brand identity design, 3D packaging, and creative studio services.',
        href: '/company/studio',
      },
      {
        title: 'Contact Corporate Sales',
        description: 'Speak directly with our team in Lagos for custom high-volume orders.',
        href: '/contact',
      },
    ],
  },
];
