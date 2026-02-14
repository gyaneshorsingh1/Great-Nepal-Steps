import { useState } from 'react';
import HeroBanner from '@/components/layout/HeroBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import heroHome from '@/assets/hero-home.jpg';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Message sent! We will get back to you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+977 9851349608' },
    { icon: MapPin, label: 'Location', value: 'Kathmandu, Nepal' },
    { icon: Clock, label: 'Business Hours', value: '9 AM – 8 PM (Sun–Fri)' },
    { icon: Mail, label: 'Email', value: 'info@greatnepal.com' },
  ];

  return (
    <>
      <HeroBanner image={heroHome} title="Get In Touch" subtitle="We'd love to hear from you" compact />
      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="How can we help?" rows={5} />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Contact Information</h2>
              <div className="mt-6 space-y-4">
                {contactInfo.map(c => (
                  <div key={c.label} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                    <c.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.label}</p>
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-6 flex h-48 items-center justify-center rounded-lg border border-border bg-muted">
                <p className="text-sm text-muted-foreground">📍 Google Map — Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
