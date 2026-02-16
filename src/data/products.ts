export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  sizes: number[];
  images: string[];
  description: string;
  badge?: 'new' | 'sale' | 'bestseller';
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const categories = [
  'All',
  'Sneakers',
  'Formal',
  'Sports',
  'Sandals',
  'Boots',
] as const;

export const products: Product[] = [
  {
    id: '1',
    name: 'Urban Street Runner',
    price: 3499,
    originalPrice: 4999,
    category: 'Sneakers',
    sizes: [38, 39, 40, 41, 42, 43, 44],
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
    description: 'Lightweight and breathable sneakers perfect for daily walks around Kathmandu. Cushioned sole for all-day comfort on city streets.',
    badge: 'sale',
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: '2',
    name: 'Classic Oxford Brown',
    price: 5999,
    category: 'Formal',
    sizes: [39, 40, 41, 42, 43],
    images: ['https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600'],
    description: 'Handcrafted genuine leather oxford shoes. Perfect for office wear and formal occasions in the valley.',
    badge: 'bestseller',
    rating: 4.8,
    reviews: 256,
    inStock: true,
  },
  {
    id: '3',
    name: 'Trail Blazer Pro',
    price: 6499,
    category: 'Sports',
    sizes: [39, 40, 41, 42, 43, 44, 45],
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600'],
    description: 'Built for Nepal\'s rugged trails. Waterproof upper with aggressive tread pattern for trekking and hiking.',
    badge: 'new',
    rating: 4.7,
    reviews: 89,
    inStock: true,
  },
  {
    id: '4',
    name: 'Cloud Walker White',
    price: 2999,
    originalPrice: 3999,
    category: 'Sneakers',
    sizes: [38, 39, 40, 41, 42],
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600'],
    description: 'Ultra-lightweight minimalist sneakers with cloud-like cushioning. Clean white design goes with everything.',
    badge: 'sale',
    rating: 4.3,
    reviews: 67,
    inStock: true,
  },
  {
    id: '5',
    name: 'Everest Trekking Boot',
    price: 8999,
    category: 'Boots',
    sizes: [40, 41, 42, 43, 44, 45],
    images: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600'],
    description: 'Premium trekking boots inspired by Nepal\'s highest peaks. Insulated, waterproof, and built to last.',
    badge: 'bestseller',
    rating: 4.9,
    reviews: 312,
    inStock: true,
  },
  {
    id: '6',
    name: 'Summer Breeze Sandal',
    price: 1499,
    category: 'Sandals',
    sizes: [38, 39, 40, 41, 42, 43],
    images: ['https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600'],
    description: 'Comfortable open-toe sandals perfect for Nepal\'s warm summers. Adjustable straps with cushioned footbed.',
    rating: 4.1,
    reviews: 45,
    inStock: true,
  },
  {
    id: '7',
    name: 'Metro Slip-On',
    price: 2499,
    category: 'Sneakers',
    sizes: [39, 40, 41, 42, 43],
    images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600'],
    description: 'Easy slip-on design for the busy Kathmandu commuter. Memory foam insole for superior comfort.',
    badge: 'new',
    rating: 4.4,
    reviews: 33,
    inStock: true,
  },
  {
    id: '8',
    name: 'Derby Gentleman',
    price: 7499,
    category: 'Formal',
    sizes: [40, 41, 42, 43, 44],
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600'],
    description: 'Elegant derby shoes in premium Italian-style leather. A must-have for the modern Nepali gentleman.',
    rating: 4.6,
    reviews: 98,
    inStock: true,
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'Rajesh Shrestha',
    location: 'Kathmandu',
    text: 'Best quality shoes I\'ve found online in Nepal. Fast delivery to my doorstep in Lazimpat!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sita Gurung',
    location: 'Pokhara',
    text: 'Ordered trekking boots for my Annapurna trip. Excellent quality and arrived within 3 days.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Anil Thapa',
    location: 'Bhaktapur',
    text: 'Love the Cash on Delivery option. The formal shoes I got are perfect for office. Highly recommend!',
    rating: 4,
  },
];