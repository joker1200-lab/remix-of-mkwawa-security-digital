import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/ui/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Full name is required').max(100),
  phone: z.string().trim().min(7, 'Valid phone number is required').max(20),
  email: z.string().trim().email('Enter a valid email address').max(255),
  service: z.string().trim().max(50).nullable(),
  message: z.string().trim().min(5, 'Please describe your security needs').max(1000),
});


const contactInfo = [
  {
    icon: Phone,
    title: 'Phone Numbers',
    details: [
      '+255 788 222 899 (Dar es Salaam)',
      '+255 754 723 854 (Singida)',
      '+255 717 597 680 (Iringa)',
    ],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@mkwawasecurity.co.tz'],
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['EAGT Building, Nyerere Rd,', 'Bohari Street, Adjacent to Mkuki House', 'Ilala, Dar es Salaam, Tanzania'],
  },
  {
    icon: Clock,
    title: 'Operating Hours',
    details: ['24/7 Security Operations', 'Office: Mon-Fri 8AM-5PM', 'Saturday: 8AM-1PM'],
  },
];

const Contact = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData(e.currentTarget);

    try {
      const parsed = contactSchema.parse({
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        service: data.get('service') || null,
        message: data.get('message'),
      });

      const { error } = await supabase.from('leads').insert({ ...parsed, source: 'contact-page' });
      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
      });
    } catch (error) {
      toast({
        title: 'Please check your details',
        description: error instanceof z.ZodError ? error.errors[0].message : (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Layout>
      <SEOHead
        title="Contact Us"
        description="Get in touch with Mkwawa Security for professional security services in Tanzania. Call +255 788 222 899 or visit our office in Dar es Salaam."
        canonicalUrl="/contact"
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-navy-dark opacity-90" />
        <div className="container-custom relative z-10" ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
              Contact Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Ready to secure your property? Contact us today for a free security 
              assessment and customized quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="bg-accent/10 rounded-xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    Your message has been sent successfully. We'll contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        name="name"
                        maxLength={100}
                        placeholder="Your full name"
                        className="bg-card"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        required
                        name="phone"
                        type="tel"
                        maxLength={20}
                        placeholder="+255 xxx xxx xxx"
                        className="bg-card"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      required
                      name="email"
                      type="email"
                      maxLength={255}
                      placeholder="your@email.com"
                      className="bg-card"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      className="w-full h-10 px-3 rounded-md border border-input bg-card text-foreground"
                    >
                      <option value="">Select a service...</option>
                      <option value="guarding">Security Guarding</option>
                      <option value="response">Armed Response</option>
                      <option value="cctv">CCTV Systems</option>
                      <option value="vip">VIP Protection</option>
                      <option value="training">Training & Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Your Message *
                    </label>
                    <Textarea
                      required
                      name="message"
                      rows={5}
                      maxLength={1000}
                      placeholder="Tell us about your security needs..."
                      className="bg-card"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-accent-foreground hover:bg-gold-dark font-heading font-semibold"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-8">
                Reach out to us through any of the following channels. Our team is ready 
                to assist you with your security needs.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-6 bg-card rounded-xl border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 bg-muted">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.8577890766636!2d39.2833709!3d-6.8829268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c35a94c11f28d%3A0xd947dd49ede97787!2sMkwawa%20Security%20Cmpany%20Ltd!5e0!3m2!1sen!2stz!4v1706000000000!5m2!1sen!2stz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mkwawa Security Location"
        />
      </section>
    </Layout>
  );
};

export default Contact;
