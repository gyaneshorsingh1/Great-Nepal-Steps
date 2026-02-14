import HeroBanner from '@/components/layout/HeroBanner';
import heroHome from '@/assets/hero-home.jpg';

const PrivacyPolicy = () => (
  <>
    <HeroBanner image={heroHome} title="Your Privacy Matters" compact />
    <section className="section-padding">
      <div className="container-main prose prose-sm max-w-3xl text-muted-foreground">
        <h2 className="font-display text-2xl font-bold text-foreground">Privacy Policy</h2>
        <p>Last updated: February 2026</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Information We Collect</h3>
        <ul>
          <li>Name, email address, and phone number</li>
          <li>Shipping address and order history</li>
          <li>Payment method preference (COD / Online)</li>
          <li>Cookies and analytics tracking data</li>
        </ul>

        <h3 className="font-display text-lg font-semibold text-foreground">How We Use Your Information</h3>
        <ul>
          <li>Process and deliver your orders</li>
          <li>Improve our services and user experience</li>
          <li>Send order status updates and notifications</li>
          <li>Marketing communications (optional, with consent)</li>
        </ul>

        <h3 className="font-display text-lg font-semibold text-foreground">Data Protection</h3>
        <p>We store your data securely with encrypted password storage and role-based access control. We do not sell your personal data to third parties.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Payment Security</h3>
        <p>Cash on Delivery payments are handled directly. eSewa and Khalti payments are processed through secure payment gateways. We do not store payment credentials.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Cookies</h3>
        <p>We use cookies for login session management, cart persistence, and analytics tracking to improve your shopping experience.</p>

        <h3 className="font-display text-lg font-semibold text-foreground">Contact Us</h3>
        <p>Phone: +977 9851349608<br />Location: Kathmandu, Nepal<br />Email: info@greatnepal.com</p>
      </div>
    </section>
  </>
);

export default PrivacyPolicy;
