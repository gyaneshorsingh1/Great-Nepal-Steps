import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import HeroBanner from '@/components/layout/HeroBanner';
import heroShop from '@/assets/hero-shop.jpg';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully! We will contact you shortly.');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <>
        <HeroBanner image={heroShop} title="Your Cart" compact />
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 section-padding">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
          <h2 className="font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <HeroBanner image={heroShop} title="Your Cart / Checkout" compact />
      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground">Cart Items</h2>
              <div className="mt-6 space-y-4">
                {items.map(item => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 rounded-lg border border-border bg-card p-4"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-foreground">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-border hover:bg-muted"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-border hover:bg-muted"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-bold text-primary">
                          NPR {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Checkout</h2>
              <div className="mt-6 space-y-4 rounded-lg border border-border bg-card p-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="+977-98XXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input placeholder="Street address" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input placeholder="Kathmandu" />
                </div>
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="esewa">eSewa</SelectItem>
                      <SelectItem value="khalti">Khalti</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>NPR {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="mt-2 flex justify-between font-display text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">NPR {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
