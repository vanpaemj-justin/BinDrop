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
    ],
    pricing: {
      '2': 119,
      '4': 159,
    },
    paymentLink: {
      '2': 'https://buy.stripe.com/aFa9ALaBa8GO7QZ4zl5Vu06',
      '4': 'https://buy.stripe.com/fZufZ95gQ7CK6MV8PB5Vu07',
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
    ],
    pricing: {
      '2': 169,
      '4': 209,
    },
    paymentLink: {
      '2': 'https://buy.stripe.com/7sY7sD7oYf5c6MV4zl5Vu08',
      '4': 'https://buy.stripe.com/6oU4grgZyaOWdbj0j55Vu09',
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
    ],
    pricing: {
      '2': 219,
      '4': 259,
    },
    paymentLink: {
      '2': 'https://buy.stripe.com/bJe6ozfVuaOWdbj6Ht5Vu0a',
      '4': 'https://buy.stripe.com/14A28j10A5uC7QZc1N5Vu0b',
    },
  },
];