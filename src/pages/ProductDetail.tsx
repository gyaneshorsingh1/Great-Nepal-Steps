import { useParams, Link } from 'react-router-dom';
import { products as dummyProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Truck, ShieldCheck, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { mergeById, mapDbProduct } from '@/lib/mergeData';
import type { Product } from '@/data/products';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const { id } = useParams();
  const [realProducts, setRealProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('products').select('*').then(({ data }) => {
      if (data) setRealProducts(data.map(mapDbProduct));
      setLoading(false);
    });
  }, []);

  const combinedProducts = useMemo(() => mergeById(dummyProducts, realProducts), [realProducts]);
  const product = combinedProducts.find(p => p.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const images = product
    ? product.images.length > 1
      ? product.images
      : [product.images[0], product.images[0], product.images[0]]
    : [];

  const prevImg = useCallback(() => setActiveImg(i => (i - 1 + images.length) % images.length), [images.length]);
  const nextImg = useCallback(() => setActiveImg(i => (i + 1) % images.length), [images.length]);

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Product Not Found</h1>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const related = combinedProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Image carousel */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              {/* Thumbnails */}
              <div className="flex gap-2 sm:flex-col sm:gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px] scrollbar-none">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden border-2 transition-all ${
                      activeImg === i ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="relative flex-1 overflow-hidden rounded-lg bg-muted group">
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  className="h-full w-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`h-2 w-2 rounded-full transition-all ${
                            activeImg === i ? 'bg-primary w-4' : 'bg-background/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{product.category}</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-border'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">NPR {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    NPR {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              {/* Size */}
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-foreground">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex h-10 w-12 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                        selectedSize === s
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background text-foreground hover:border-primary'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-foreground">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background hover:bg-muted"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" onClick={handleAddToCart}>
                  Buy Now
                </Button>
              </div>

              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Kathmandu: 1–2 days · Outside Valley: 3–5 days</p>
                <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Genuine quality guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-main">
            <h2 className="font-display text-2xl font-bold text-foreground">You May Also Like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;