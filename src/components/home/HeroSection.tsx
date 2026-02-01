import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-security.jpg';

const HeroSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
        <div className="max-w-3xl">
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
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-gold-dark font-heading font-semibold text-lg px-8 py-6 shadow-gold"
            >
              <Link to="/contact">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
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
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20"
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
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
