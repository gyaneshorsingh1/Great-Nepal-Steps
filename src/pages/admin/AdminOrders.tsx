import { useEffect, useState, useMemo } from 'react';
import HeroBanner from '@/components/layout/HeroBanner';
import { supabase } from '@/integrations/supabase/client';
import { dummyOrders } from '@/data/dummyOrders';
import { mergeById } from '@/lib/mergeData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import heroHome from '@/assets/hero-home.jpg';

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  _isDemo?: boolean;
}

const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const dummyAdminOrders: Order[] = dummyOrders.map(o => ({ ...o, _isDemo: true }));

const AdminOrders = () => {
  const [realOrders, setRealOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('all');

  const fetchOrders = async () => {
    let q = supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') q = q.eq('order_status', filter);
    const { data } = await q;
    if (data) setRealOrders(data as Order[]);
  };

  useEffect(() => { fetchOrders(); }, [filter]);

  const combinedOrders = useMemo(() => {
    const filtered = filter === 'all' ? dummyAdminOrders : dummyAdminOrders.filter(o => o.order_status === filter);
    return mergeById(filtered, realOrders);
  }, [realOrders, filter]);

  const updateStatus = async (order: Order, status: string) => {
    if (order._isDemo) { toast.info('Cannot update demo order status'); return; }
    const { error } = await supabase.from('orders').update({ order_status: status }).eq('id', order.id);
    if (error) { toast.error('Failed to update'); return; }
    toast.success('Status updated');
    fetchOrders();
  };

  return (
    <>
      <HeroBanner image={heroHome} title="Order Management" compact />
      <section className="section-padding">
        <div className="container-main">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground">Orders ({combinedOrders.length})</h2>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 space-y-3">
            {combinedOrders.map(o => (
              <div key={o.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      {o.customer_name}
                      {o._isDemo && <span className="ml-2 text-xs text-muted-foreground">(demo)</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{o.customer_phone} · {o.customer_city}</p>
                    <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">NPR {Number(o.total_amount).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground capitalize">{o.payment_method}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Select value={o.order_status} onValueChange={v => updateStatus(o, v)} disabled={o._isDemo}>
                    <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statuses.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            {combinedOrders.length === 0 && <p className="text-muted-foreground">No orders found.</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminOrders;