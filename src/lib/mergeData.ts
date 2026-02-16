import { Product } from '@/data/products';

/**
 * Merge dummy data with real data. Real data overrides dummy if IDs match.
 */
export function mergeById<T extends { id: string }>(dummy: T[], real: T[]): T[] {
  const realIds = new Set(real.map(r => r.id));
  return [...dummy.filter(d => !realIds.has(d.id)), ...real];
}

/**
 * Map a Supabase product row to the frontend Product interface.
 */
export function mapDbProduct(row: {
  id: string;
  title: string;
  description: string | null;
  price: number;
  discount_price: number | null;
  category: string;
  images: string[] | null;
  sizes: number[] | null;
  stock: number;
  is_featured: boolean;
}): Product {
  return {
    id: row.id,
    name: row.title,
    price: Number(row.discount_price ?? row.price),
    originalPrice: row.discount_price ? Number(row.price) : undefined,
    category: row.category,
    sizes: row.sizes ?? [],
    images: row.images?.length ? row.images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
    description: row.description ?? '',
    badge: row.is_featured ? 'bestseller' : undefined,
    rating: 4.5,
    reviews: 0,
    inStock: row.stock > 0,
  };
}