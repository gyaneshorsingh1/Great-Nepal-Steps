import HeroBanner from '@/components/layout/HeroBanner';
import heroHome from '@/assets/hero-home.jpg';

const ReturnPolicy = () => (
  <>
    <HeroBanner image={heroHome} title="Return & Refund Policy" compact />
    <section className="section-padding">
      <div className="container-main prose prose-sm max-w-3xl text-muted-foreground">
        <h2 className="font-display text-2xl font-bold text-foreground">Return & Refund Policy</h2>

        <h3 className="font-display text-lg font-semibold text-foreground">7-Day Return Window</h3>
        <p>You may return any product within 7 days of delivery. The product must be unused, unworn, and in its original packaging with all tags intact.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Return Shipping</h3>
        <p>Return shipping costs are borne by the customer unless the return is due to a defective or incorrect product.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Refund Processing</h3>
        <p>Refunds are processed within 5–7 business days after we receive and inspect the returned product. Refunds will be issued to your original payment method.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Damaged Products</h3>
        <p>If you receive a damaged product, please contact us within 24 hours with photos. We will arrange a free replacement or full refund.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Non-Returnable Items</h3>
        <p>Customized or personalized shoes, clearance items marked as "final sale", and products that show signs of wear are not eligible for return.</p>
      </div>
    </section>
  </>
);

export default ReturnPolicy;
