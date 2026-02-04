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
import serviceGuarding from '@/assets/service-guarding.jpg';
import serviceArmedResponse from '@/assets/service-armed-response.jpg';
import serviceCctv from '@/assets/service-cctv.jpg';
import serviceVip from '@/assets/service-vip.jpg';
import serviceTraining from '@/assets/service-training.jpg';
import serviceBackground from '@/assets/service-background.jpg';

const services = [
  {
    icon: Shield,
    title: 'Security Guarding',
    description: 'Armed and unarmed professional guards for residential, commercial, and industrial properties.',
    image: serviceGuarding,
  },
  {
    icon: Siren,
    title: 'Armed Response',
    description: 'Swift tactical response with GPS-tracked vehicles and highly trained reaction officers.',
    image: serviceArmedResponse,
  },
  {
    icon: Cctv,
    title: 'Security Systems',
    description: 'CCTV, alarms, electric fencing, access control, and surveillance camera installation.',
    image: serviceCctv,
  },
  {
    icon: Users,
    title: 'VIP Protection',
    description: 'Executive protection and transport escort services for high-profile individuals.',
    image: serviceVip,
  },
  {
    icon: GraduationCap,
    title: 'Training & Consulting',
    description: 'Security training programs and professional consulting for tailored security solutions.',
    image: serviceTraining,
  },
  {
    icon: Lock,
    title: 'Background Checks',
    description: 'Comprehensive background screening and lie detector tests for employee verification.',
    image: serviceBackground,
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
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              
              {/* Service Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
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
