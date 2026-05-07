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
      '2': 'https://buy.stripe.com/8x2fZ9gZy3mu0ox9TF5Vu0c',
      '4': 'https://buy.stripe.com/14AeV5aBa9KS9Z75Dp5Vu0d',
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
      '2': 'https://buy.stripe.com/fZuaEPaBa7CK1sB8PB5Vu0e',
      '4': 'https://buy.stripe.com/14A14f5gQ3mub3b7Lx5Vu0f',
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
      '2': 'https://buy.stripe.com/28E9ALbFe3mudbjfdZ5Vu0g',
      '4': 'https://buy.stripe.com/aFa9ALdNmcX45IR3vh5Vu0h',
    },
  },
];