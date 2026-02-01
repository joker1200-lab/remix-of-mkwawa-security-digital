import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Shield, 
  Users, 
  Cctv, 
  Siren, 
  GraduationCap, 
  Lock,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Shield,
    title: 'Security Guarding',
    description: 'Armed and unarmed professional guards for residential, commercial, and industrial properties.',
  },
  {
    icon: Siren,
    title: 'Armed Response',
    description: 'Swift tactical response with GPS-tracked vehicles and highly trained reaction officers.',
  },
  {
    icon: Cctv,
    title: 'Security Systems',
    description: 'CCTV, alarms, electric fencing, access control, and surveillance camera installation.',
  },
  {
    icon: Users,
    title: 'VIP Protection',
    description: 'Executive protection and transport escort services for high-profile individuals.',
  },
  {
    icon: GraduationCap,
    title: 'Training & Consulting',
    description: 'Security training programs and professional consulting for tailored security solutions.',
  },
  {
    icon: Lock,
    title: 'Background Checks',
    description: 'Comprehensive background screening and lie detector tests for employee verification.',
  },
];

const ServicesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Comprehensive Security Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From physical guarding to advanced security systems, we provide end-to-end security 
            solutions tailored to your specific needs and budget.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-card rounded-xl p-8 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-navy-light font-heading font-semibold"
          >
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
