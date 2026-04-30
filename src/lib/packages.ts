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
  paymentLink: {
    '2': string;
    '4': string;
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
    paymentLink: {
      '2': 'https://buy.stripe.com/00w4gr10AaOW6MVd5R5Vu00',
      '4': 'https://buy.stripe.com/7sYfZ938I5uC4EN1n95Vu01',
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
    paymentLink: {
      '2': 'https://buy.stripe.com/8x228j9x69KS3AJ8PB5Vu02',
      '4': 'https://buy.stripe.com/3cIfZ9gZyg9g0oxaXJ5Vu03',
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
    paymentLink: {
      '2': 'https://buy.stripe.com/fZu8wH4cMg9g4ENc1N5Vu04',
      '4': 'https://buy.stripe.com/14A3cn4cMf5cgnve9V5Vu05',
    },
  },
];