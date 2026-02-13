import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border bg-secondary">
    <div className="container-main py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-4 font-display text-lg font-bold text-primary">Great Nepal</h3>
          <p className="text-sm text-muted-foreground">
            Premium footwear for every step. Kathmandu's trusted online shoe destination.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link>
            <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary">Shop</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
            <Link to="/cart" className="text-sm text-muted-foreground hover:text-primary">Cart</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kathmandu, Nepal</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +977-1-XXXXXXX</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@greatnepal.com</span>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Payment Methods</h4>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-background px-3 py-1 text-xs font-medium text-foreground">eSewa</span>
            <span className="rounded-md bg-background px-3 py-1 text-xs font-medium text-foreground">Khalti</span>
            <span className="rounded-md bg-background px-3 py-1 text-xs font-medium text-foreground">Cash on Delivery</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            🚚 Kathmandu: 1–2 days · Outside Valley: 3–5 days
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 Great Nepal Online Shopping. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
