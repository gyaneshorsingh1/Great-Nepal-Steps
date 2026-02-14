import HeroBanner from '@/components/layout/HeroBanner';
import heroHome from '@/assets/hero-home.jpg';

const ShippingPolicy = () => (
  <>
    <HeroBanner image={heroHome} title="Shipping Information" compact />
    <section className="section-padding">
      <div className="container-main prose prose-sm max-w-3xl text-muted-foreground">
        <h2 className="font-display text-2xl font-bold text-foreground">Shipping & Delivery Policy</h2>

        <h3 className="font-display text-lg font-semibold text-foreground">Delivery Timelines</h3>
        <ul>
          <li><strong>Inside Kathmandu Valley:</strong> 1–2 business days</li>
          <li><strong>Outside Kathmandu Valley:</strong> 3–5 business days</li>
        </ul>

        <h3 className="font-display text-lg font-semibold text-foreground">Cash on Delivery</h3>
        <p>COD is available nationwide across Nepal. Pay when your order arrives at your doorstep.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Shipping Charges</h3>
        <p>Delivery within Kathmandu Valley is free for orders above NPR 3,000. A flat delivery fee of NPR 100 applies for orders below NPR 3,000. Outside Valley deliveries carry a flat fee of NPR 200.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Delivery Partners</h3>
        <p>We work with trusted local courier services to ensure safe and timely delivery of your orders.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Order Tracking</h3>
        <p>Once shipped, you can track your order status from your profile dashboard.</p>
      </div>
    </section>
  </>
);

export default ShippingPolicy;
