import { useState, useMemo, useEffect } from 'react';
import HeroBanner from '@/components/layout/HeroBanner';
import ProductCard from '@/components/shop/ProductCard';
import { products as dummyProducts, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { mergeById, mapDbProduct } from '@/lib/mergeData';
import type { Product } from '@/data/products';
import heroShop from '@/assets/hero-shop.jpg';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

const Shop = () => {
  const [category, setCategory] = useState<string>('All');
  const [sort, setSort] = useState<SortOption>('newest');
  const [realProducts, setRealProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase.from('products').select('*').then(({ data }) => {
      if (data) setRealProducts(data.map(mapDbProduct));
    });
  }, []);

  const combinedProducts = useMemo(
    () => mergeById(dummyProducts, realProducts),
    [realProducts]
  );

  const filtered = useMemo(() => {
    let list = category === 'All' ? [...combinedProducts] : combinedProducts.filter(p => p.category === category);
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'popular': list.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }
    return list;
  }, [category, sort, combinedProducts]);

  return (
    <>
      <HeroBanner image={heroShop} title="Browse Our Shoe Collections" compact />

      <section className="section-padding">
        <div className="container-main">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <Button
                  key={c}
                  variant={category === c ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low → High</SelectItem>
                <SelectItem value="price-desc">Price: High → Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">No products found in this category.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;