import HeroBanner from '@/components/layout/HeroBanner';
import { MapPin, Heart, Award, Users } from 'lucide-react';
import heroHome from '@/assets/hero-home.jpg';

const values = [
  { icon: Heart, title: 'Passion for Quality', description: 'Every pair we sell meets our strict quality standards — comfort, durability, and style.' },
  { icon: Award, title: 'Trusted Since Day One', description: 'Built on trust, we\'ve served thousands of happy customers across Nepal.' },
  { icon: Users, title: 'Customer First', description: 'Your satisfaction drives us. From easy returns to fast delivery, we put you first.' },
  { icon: MapPin, title: 'Proudly Nepali', description: 'Based in Kathmandu, we understand what Nepali feet need — and we deliver.' },
];

const About = () => (
  <>
    <HeroBanner
      image={heroHome}
      title="About Great Nepal"
      subtitle="Kathmandu's trusted destination for premium footwear since day one."
      compact
    />

    {/* Story */}
    <section className="section-padding">
      <div className="container-main max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold text-foreground">Our Story</h2>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Great Nepal Online Shopping was born from a simple idea — make quality footwear accessible to every Nepali, 
          no matter where they live. From the bustling streets of Kathmandu to the serene hills beyond the valley, 
          we deliver premium shoes right to your doorstep.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We partner with trusted brands and local artisans to bring you a curated collection of men's, women's, 
          and sports footwear — all at fair prices with the convenience of eSewa, Khalti, and Cash on Delivery.
        </p>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-secondary">
      <div className="container-main">
        <h2 className="text-center font-display text-3xl font-bold text-foreground">What We Stand For</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(v => (
            <div key={v.title} className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="section-padding">
      <div className="container-main max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold text-foreground">Our Mission</h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          To be Nepal's most loved online footwear brand — offering quality, convenience, and style 
          to every step you take. 🇳🇵
        </p>
      </div>
    </section>
  </>
);

export default About;
