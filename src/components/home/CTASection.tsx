import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-accent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-foreground/5 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mb-6">
            Ready to Secure Your Future?
          </h2>
          <p className="text-lg md:text-xl text-accent-foreground/80 mb-10 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust Mkwawa Security for their protection needs. 
            Contact us today for a free security assessment.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-navy-light font-heading font-semibold text-lg px-8 py-6"
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
              className="border-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent font-heading font-semibold text-lg px-8 py-6"
            >
              <a href="tel:+255788222899">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-accent-foreground/80">
            <a href="tel:+255788222899" className="flex items-center gap-2 hover:text-accent-foreground transition-colors">
              <Phone className="w-5 h-5" />
              <span>+255 788 222 899</span>
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="mailto:info@mkwawasecurity.co.tz" className="flex items-center gap-2 hover:text-accent-foreground transition-colors">
              <Mail className="w-5 h-5" />
              <span>info@mkwawasecurity.co.tz</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
