import HeroBanner from '@/components/layout/HeroBanner';
import heroHome from '@/assets/hero-home.jpg';

const TermsConditions = () => (
  <>
    <HeroBanner image={heroHome} title="Terms & Conditions" compact />
    <section className="section-padding">
      <div className="container-main prose prose-sm max-w-3xl text-muted-foreground">
        <h2 className="font-display text-2xl font-bold text-foreground">Terms & Conditions</h2>
        <p>Last updated: February 2026</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Acceptance of Terms</h3>
        <p>By using Great Nepal Online Shopping, you agree to these terms and conditions. If you do not agree, please do not use our services.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Product Pricing</h3>
        <p>All prices are listed in Nepalese Rupees (NPR). Prices are subject to change without prior notice. Discounts and offers are valid for limited periods only.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Order Confirmation</h3>
        <p>Orders are confirmed once you receive an order confirmation via email or SMS. We reserve the right to cancel orders due to stock unavailability.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Cash on Delivery Rules</h3>
        <p>COD orders must be paid in full at the time of delivery. Refusal to accept delivery may result in blacklisting from COD services.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Return & Exchange</h3>
        <p>Products may be returned within 7 days of delivery if unused and in original packaging. See our Return Policy for details.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Cancellation Policy</h3>
        <p>Orders can be cancelled before shipping. Once shipped, cancellation is not possible — you may initiate a return instead.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Limitation of Liability</h3>
        <p>Great Nepal Online Shopping is not liable for delays caused by third-party logistics, natural disasters, or circumstances beyond our control.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Governing Law</h3>
        <p>These terms are governed by the laws of Nepal. Any disputes shall be resolved in the courts of Kathmandu, Nepal.</p>
      </div>
    </section>
  </>
);

export default TermsConditions;
