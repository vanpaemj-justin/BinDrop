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
    num_totes: 15,
    has_dolly: false,
    description: 'Perfect for studio or small one-bedroom',
    features: [
      '15 reusable moving bins',
      'Free delivery & pickup',
      '2 weeks rental',
    ],
    pricing: {
      '2': 119,
      '4': 159,
    },
  },
  {
    id: '2',
    name: 'Standard',
    num_totes: 30,
    has_dolly: true,
    description: 'Most popular for 1-2 bedrooms',
    features: [
      '30 reusable moving bins',
      '1 dolly included',
      'Free delivery & pickup',
      '2 weeks rental',
    ],
    pricing: {
      '2': 169,
      '4': 209,
    },
  },
  {
    id: '3',
    name: 'Large',
    num_totes: 45,
    has_dolly: true,
    description: 'Best for 3+ bedrooms',
    features: [
      '45 reusable moving bins',
      '1 dolly included',
      'Free delivery & pickup',
      '2 weeks rental',
    ],
    pricing: {
      '2': 219,
      '4': 259,
    },
  },
];