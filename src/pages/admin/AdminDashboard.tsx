import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '@/components/layout/HeroBanner';
import { supabase } from '@/integrations/supabase/client';
import { products as dummyProducts } from '@/data/products';
import { Package, ShoppingBag, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import heroHome from '@/assets/hero-home.jpg';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, customers: 0, lowStock: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [ordersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('total_amount'),
        supabase.from('products').select('stock'),
      ]);

      const realOrders = ordersRes.data || [];
      const realProducts = productsRes.data || [];
      const revenue = realOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
      const lowStock = realProducts.filter(p => p.stock < 5).length;

      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

      setStats({
        orders: realOrders.length,
        revenue,
        customers: count || 0,
        lowStock,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Orders', value: stats.orders, icon: ShoppingBag, color: 'text-primary' },
    { title: 'Total Revenue', value: `NPR ${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-success' },
    { title: 'Customers', value: stats.customers, icon: Users, color: 'text-accent' },
    { title: 'Low Stock Items', value: stats.lowStock, icon: AlertTriangle, color: 'text-destructive' },
  ];

  const navItems = [
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers', path: '/admin/customers', icon: Users },
  ];

  return (
    <>
      <HeroBanner image={heroHome} title="Admin Control Panel" compact />
      <section className="section-padding">
        <div className="container-main">
          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(card => (
              <div key={card.title} className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <card.icon className={`h-8 w-8 ${card.color}`} />
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="font-display text-2xl font-bold text-foreground">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Nav */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <item.icon className="h-6 w-6 text-primary" />
                <span className="font-display text-lg font-semibold text-foreground">Manage {item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
