import { useEffect, useState, useMemo } from 'react';
import HeroBanner from '@/components/layout/HeroBanner';
import { supabase } from '@/integrations/supabase/client';
import { dummyCustomers } from '@/data/dummyCustomers';
import { mergeById } from '@/lib/mergeData';
import { Users } from 'lucide-react';
import heroHome from '@/assets/hero-home.jpg';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  created_at: string;
  _isDemo?: boolean;
}

const dummyProfiles: Profile[] = dummyCustomers.map(c => ({ ...c, _isDemo: true }));

const AdminCustomers = () => {
  const [realCustomers, setRealCustomers] = useState<Profile[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (data) setRealCustomers(data as Profile[]);
    };
    fetch();
  }, []);

  const combinedCustomers = useMemo(
    () => mergeById(dummyProfiles, realCustomers),
    [realCustomers]
  );

  return (
    <>
      <HeroBanner image={heroHome} title="Customer Management" compact />
      <section className="section-padding">
        <div className="container-main">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
            <Users className="h-6 w-6" /> Customers ({combinedCustomers.length})
          </h2>
          <div className="mt-6 space-y-3">
            {combinedCustomers.map(c => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                <div>
                  <p className="font-semibold text-foreground">
                    {c.full_name || 'Unnamed'}
                    {c._isDemo && <span className="ml-2 text-xs text-muted-foreground">(demo)</span>}
                  </p>
                  <p className="text-sm text-muted-foreground">{c.phone || 'No phone'}</p>
                </div>
                <p className="text-xs text-muted-foreground">Joined {new Date(c.created_at).toLocaleDateString()}</p>
              </div>
            ))}
            {combinedCustomers.length === 0 && <p className="text-muted-foreground">No customers yet.</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminCustomers;