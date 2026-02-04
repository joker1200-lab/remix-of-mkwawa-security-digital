import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, ArrowRight, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-security.jpg';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  phone: z.string().trim().min(1, 'Phone is required').max(20, 'Phone must be less than 20 characters'),
  service: z.string().trim().min(1, 'Please select a service'),
  message: z.string().trim().max(500, 'Message must be less than 500 characters').optional(),
});

const HeroSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = formSchema.parse(formData);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Request Submitted!',
        description: 'We will contact you within 24 hours.',
      });
      
      setFormData({ name: '', phone: '', service: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Please check your input',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Mkwawa Security Guard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <Shield className="w-8 h-8 text-accent" />
              <span className="font-heading font-semibold text-accent uppercase tracking-wider">
                Trusted Security Since 2019
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
            >
              Your Safety, <br />
              <span className="text-accent">Our Business</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl"
            >
              Mkwawa Security is a Tanzanian company dedicated to providing excellent security services. 
              We offer a complete range of planning, system analysis, and executive protection services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading font-semibold text-lg px-8 py-6"
              >
                <a href="tel:+255788222899">
                  <Phone className="w-5 h-5 mr-2" />
                  +255 788 222 899
                </a>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-primary-foreground/20"
            >
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-accent">500+</p>
                <p className="text-sm text-primary-foreground/70">Active Clients</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-accent">24/7</p>
                <p className="text-sm text-primary-foreground/70">Security Coverage</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-accent">1000+</p>
                <p className="text-sm text-primary-foreground/70">Trained Officers</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-accent">5+</p>
                <p className="text-sm text-primary-foreground/70">Years Experience</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:ml-auto"
          >
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border max-w-md">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                Get a Free Quote
              </h3>
              <p className="text-muted-foreground mb-6">
                Fill in your details and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background border-border"
                    maxLength={20}
                  />
                </div>
                <div>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Service *</option>
                    <option value="security-guarding">Security Guarding</option>
                    <option value="armed-response">Armed Response</option>
                    <option value="cctv-systems">CCTV & Security Systems</option>
                    <option value="vip-protection">VIP Protection</option>
                    <option value="training">Training & Consulting</option>
                    <option value="background-checks">Background Checks</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Textarea
                    placeholder="Additional Message (Optional)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-border resize-none"
                    rows={3}
                    maxLength={500}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-gold-dark font-heading font-semibold shadow-gold"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      Request Quote
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting, you agree to our{' '}
                <Link to="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
