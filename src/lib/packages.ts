// Local package data - no Supabase needed for MVP
export interface Package {
  id: string;
  name: string;
  num_totes: number;
  has_dolly: boolean;
  description: string;
  features: string[];
  pricing: {
    '2': number;
    '4': number;
  };
}

export const packages: Package[] = [
  {
    id: '1',
    name: 'Starter',
    num_totes: 25,
    has_dolly: true,
    description: 'Perfect for studio or small one-bedroom',
    features: [
      '25 reusable moving bins',
      '1 dolly included',
      'Free delivery & pickup',
      '2 weeks rental',
    ],
    pricing: {
      '2': 89,
      '4': 129,
    },
  },
  {
    id: '2',
    name: 'Standard',
    num_totes: 40,
    has_dolly: true,
    description: 'Most popular for 1-2 bedrooms',
    features: [
      '40 reusable moving bins',
      '1 dolly included',
      'Free delivery & pickup',
      '2 weeks rental',
    ],
    pricing: {
      '2': 139,
      '4': 199,
    },
  },
  {
    id: '3',
    name: 'Large',
    num_totes: 60,
    has_dolly: true,
    description: 'Best for 3+ bedrooms',
    features: [
      '60 reusable moving bins',
      '2 dollies included',
      'Free delivery & pickup',
      '2 weeks rental',
    ],
    pricing: {
      '2': 199,
      '4': 279,
    },
  },
];