import { useEffect, useState, useMemo } from 'react';
import HeroBanner from '@/components/layout/HeroBanner';
import { supabase } from '@/integrations/supabase/client';
import { products as dummyProductsRaw } from '@/data/products';
import { mergeById } from '@/lib/mergeData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import heroHome from '@/assets/hero-home.jpg';

interface AdminProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price: number | null;
  category: string;
  images: string[];
  sizes: number[];
  stock: number;
  is_featured: boolean;
  _isDemo?: boolean;
}

// Map dummy products to the admin product shape
const dummyAdminProducts: AdminProduct[] = dummyProductsRaw.map(p => ({
  id: p.id,
  title: p.name,
  description: p.description,
  price: p.originalPrice ?? p.price,
  discount_price: p.originalPrice ? p.price : null,
  category: p.category,
  images: p.images,
  sizes: p.sizes,
  stock: p.inStock ? 50 : 0,
  is_featured: p.badge === 'bestseller',
  _isDemo: true,
}));

const emptyProduct = {
  title: '', description: '', price: 0, discount_price: null as number | null,
  category: 'Sneakers', images: [] as string[], sizes: [] as number[], stock: 0, is_featured: false,
};

const categories = ['Sneakers', 'Formal', 'Sports', 'Sandals', 'Boots'];

const AdminProducts = () => {
  const [realProducts, setRealProducts] = useState<AdminProduct[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [imageInput, setImageInput] = useState('');
  const [sizesInput, setSizesInput] = useState('');

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setRealProducts(data.map(d => ({ ...d, description: d.description ?? '', images: d.images ?? [], sizes: d.sizes ?? [] })) as AdminProduct[]);
  };

  useEffect(() => { fetchProducts(); }, []);

  const combinedProducts = useMemo(
    () => mergeById(dummyAdminProducts, realProducts),
    [realProducts]
  );

  const openCreate = () => {
    setEditId(null);
    setForm(emptyProduct);
    setImageInput('');
    setSizesInput('');
    setDialogOpen(true);
  };

  const openEdit = (p: AdminProduct) => {
    if (p._isDemo) { toast.info('Demo products cannot be edited'); return; }
    setEditId(p.id);
    setForm({ title: p.title, description: p.description, price: p.price, discount_price: p.discount_price, category: p.category, images: p.images, sizes: p.sizes, stock: p.stock, is_featured: p.is_featured });
    setImageInput(p.images.join(', '));
    setSizesInput(p.sizes.join(', '));
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const images = imageInput.split(',').map(s => s.trim()).filter(Boolean);
    const sizes = sizesInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    const payload = { ...form, images, sizes };

    if (editId) {
      const { error } = await supabase.from('products').update(payload).eq('id', editId);
      if (error) { toast.error('Failed to update'); return; }
      toast.success('Product updated');
    } else {
      const { error } = await supabase.from('products').insert(payload);
      if (error) { toast.error('Failed to create'); return; }
      toast.success('Product created');
    }
    setDialogOpen(false);
    fetchProducts();
  };

  const handleDelete = async (p: AdminProduct) => {
    if (p._isDemo) { toast.info('Demo products cannot be deleted'); return; }
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', p.id);
    toast.success('Product deleted');
    fetchProducts();
  };

  return (
    <>
      <HeroBanner image={heroHome} title="Product Management" compact />
      <section className="section-padding">
        <div className="container-main">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground">Products ({combinedProducts.length})</h2>
            <Button onClick={openCreate}><Plus className="mr-1 h-4 w-4" /> Add Product</Button>
          </div>

          <div className="mt-6 space-y-3">
            {combinedProducts.map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-4">
                  {p.images[0] && <img src={p.images[0]} alt={p.title} className="h-14 w-14 rounded object-cover" />}
                  <div>
                    <p className="font-semibold text-foreground">
                      {p.title}
                      {p._isDemo && <span className="ml-2 text-xs text-muted-foreground">(demo)</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{p.category} · Stock: {p.stock} · NPR {p.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => openEdit(p)} disabled={p._isDemo}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(p)} disabled={p._isDemo}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
            {combinedProducts.length === 0 && <p className="text-muted-foreground">No products yet. Add your first product!</p>}
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editId ? 'Edit Product' : 'Add Product'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price (NPR)</Label>
                    <Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Discount Price</Label>
                    <Input type="number" value={form.discount_price ?? ''} onChange={e => setForm(f => ({ ...f, discount_price: e.target.value ? Number(e.target.value) : null }))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Image URLs (comma-separated)</Label>
                  <Input value={imageInput} onChange={e => setImageInput(e.target.value)} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>Sizes (comma-separated)</Label>
                  <Input value={sizesInput} onChange={e => setSizesInput(e.target.value)} placeholder="38, 39, 40, 41" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Stock</Label>
                    <Input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))} />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} className="h-4 w-4" />
                    <Label>Featured</Label>
                  </div>
                </div>
                <Button className="w-full" onClick={handleSave}>
                  {editId ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
};

export default AdminProducts;