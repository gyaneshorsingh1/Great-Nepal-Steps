import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '@/components/layout/HeroBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut, Package, User, Loader2 } from 'lucide-react';
import heroHome from '@/assets/hero-home.jpg';

interface Order {
  id: string;
  total_amount: number;
  order_status: string;
  payment_method: string;
  created_at: string;
}

const Profile = () => {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ full_name: '', phone: '' });

  useEffect(() => {
    if (profile) {
      setForm({ full_name: profile.full_name, phone: profile.phone });
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      supabase.from('orders').select('id, total_amount, order_status, payment_method, created_at')
        .eq('user_id', user.id).order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) setOrders(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    const { error } = await supabase.from('profiles').update({ full_name: form.full_name, phone: form.phone }).eq('user_id', user.id);
    if (error) { toast.error('Failed to update profile'); return; }
    toast.success('Profile updated!');
    await refreshProfile();
    setEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const statusColor: Record<string, string> = {
    pending: 'bg-accent/20 text-accent-foreground',
    confirmed: 'bg-primary/20 text-primary',
    shipped: 'bg-primary/10 text-primary',
    delivered: 'bg-success/20 text-success',
    cancelled: 'bg-destructive/20 text-destructive',
  };

  return (
    <>
      <HeroBanner image={heroHome} title="My Account Dashboard" compact />
      <section className="section-padding">
        <div className="container-main max-w-3xl">
          {/* Profile Info */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">{profile?.full_name || 'User'}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </div>

            {editing ? (
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Phone: {profile?.phone || 'Not set'}</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            )}
          </div>

          {/* Orders */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
              <Package className="h-5 w-5" /> Order History ({orders.length})
            </h3>
            {loading ? (
              <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <p className="mt-4 text-muted-foreground">No orders yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Order #{order.id.slice(0, 8)}
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">NPR {Number(order.total_amount).toLocaleString()}</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColor[order.order_status] || ''}`}>
                        {order.order_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;