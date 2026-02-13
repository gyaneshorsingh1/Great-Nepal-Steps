import { Link } from 'react-router-dom';
import HeroBanner from '@/components/layout/HeroBanner';
import ProductCard from '@/components/shop/ProductCard';
import { products, testimonials } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Star, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import heroHome from '@/assets/hero-home.jpg';

const featuredProducts = products.filter(p => p.badge === 'bestseller' || p.badge === 'sale').slice(0, 4);
const newArrivals = products.filter(p => p.badge === 'new');

const Index = () => (
  <>
    <HeroBanner
      image={heroHome}
      title="Premium Footwear for Every Step"
      subtitle="Shop the finest shoes in Nepal — delivered to your doorstep in Kathmandu & beyond."
    />

    {/* Trust bar */}
    <section className="border-b border-border bg-secondary">
      <div className="container-main flex flex-wrap items-center justify-center gap-8 py-5 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free Delivery in Kathmandu</span>
        <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Genuine Quality</span>
        <span className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-primary" /> eSewa · Khalti · COD</span>
      </div>
    </section>

    {/* Featured / Best Sellers */}
    <section className="section-padding">
      <div className="container-main">
        <h2 className="text-center font-display text-3xl font-bold text-foreground">Best Sellers</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">
          Our most loved shoes, trusted by thousands across Nepal.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* New Arrivals */}
    {newArrivals.length > 0 && (
      <section className="section-padding bg-secondary">
        <div className="container-main">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">New Arrivals</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newArrivals.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    )}

    {/* Testimonials */}
    <section className="section-padding">
      <div className="container-main">
        <h2 className="text-center font-display text-3xl font-bold text-foreground">What Our Customers Say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map(t => (
            <div key={t.id} className="rounded-lg border border-border bg-card p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">"{t.text}"</p>
              <p className="mt-4 text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary section-padding">
      <div className="container-main text-center">
        <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to Step Up Your Style?</h2>
        <p className="mt-3 text-primary-foreground/80">
          Browse our complete collection and find your perfect pair.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-6">
          <Link to="/shop">Shop Now</Link>
        </Button>
      </div>
    </section>
  </>
);

export default Index;
