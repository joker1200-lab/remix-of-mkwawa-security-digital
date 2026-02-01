import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  Shield,
  Siren,
  Cctv,
  Users,
  GraduationCap,
  Lock,
  Fingerprint,
  Radio,
  Video,
  Zap,
  Settings,
  ArrowRight,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/ui/SEOHead';
import CTASection from '@/components/home/CTASection';
import { Button } from '@/components/ui/button';
import securitySystems from '@/assets/security-systems.jpg';

const services = [
  {
    icon: Shield,
    title: 'Security Guarding',
    description: 'Comprehensive guarding services with armed and unarmed professional guards.',
    features: [
      'Armed Guards',
      'Unarmed Guards',
      'Retail Surveillance',
      'Transport Escorts',
      'Remote Surveillance',
    ],
  },
  {
    icon: Siren,
    title: 'Armed Response',
    description: 'Swift tactical response with GPS-tracked vehicles and trained officers.',
    features: [
      '24/7 Response Team',
      'GPS Live Tracking',
      'Rapid House Training',
      'Modern Control Room',
      'Police Coordination',
    ],
  },
  {
    icon: Users,
    title: 'VIP Protection',
    description: 'Executive protection services for high-profile individuals and events.',
    features: [
      'Personal Bodyguards',
      'Executive Protection',
      'Event Security',
      'Travel Security',
      'Threat Assessment',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Training & Consulting',
    description: 'Security training programs and professional consulting services.',
    features: [
      'Guard Training',
      'Risk Assessment',
      'Security Audits',
      'Policy Development',
      'Crisis Management',
    ],
  },
  {
    icon: Lock,
    title: 'Background Checks',
    description: 'Comprehensive background screening and verification services.',
    features: [
      'Employment Screening',
      'Lie Detector Tests',
      'Criminal Checks',
      'Reference Verification',
      'Identity Confirmation',
    ],
  },
];

const securitySystemsData = [
  { icon: Cctv, name: 'CCTV Systems' },
  { icon: Radio, name: 'Alarm Systems' },
  { icon: Fingerprint, name: 'Fingerprint Readers' },
  { icon: Video, name: 'Surveillance Cameras' },
  { icon: Zap, name: 'Electric Fencing' },
  { icon: Settings, name: 'Gate Automation' },
];

const Services = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [systemsRef, systemsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Layout>
      <SEOHead
        title="Our Services"
        description="Comprehensive security services in Tanzania - Armed guards, CCTV systems, VIP protection, armed response, training, and background checks. Mkwawa Security has you covered."
        canonicalUrl="/services"
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
              Our Services
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Comprehensive Security Solutions
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              From physical guarding to advanced security systems, we provide end-to-end 
              security solutions tailored to your specific needs and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding bg-background" ref={servicesRef}>
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-foreground">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-muted/50 rounded-2xl p-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-accent/50" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Systems */}
      <section className="section-padding bg-muted/50" ref={systemsRef}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={systemsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
                Technical Solutions
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Security Systems Installation
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                MKWAWA SECURITY has monitoring solutions designed to fit any and all of your 
                security needs. Our monitoring packages will bring you peace of mind knowing 
                that your property is protected by state-of-the-art systems installed by 
                trained certified technicians.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {securitySystemsData.map((system, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={systemsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
                  >
                    <system.icon className="w-6 h-6 text-accent" />
                    <span className="font-semibold text-foreground">{system.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={systemsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={securitySystems}
                alt="Security Systems Control Room"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
              Our Process
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              How We Work
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We assess your security needs and environment' },
              { step: '02', title: 'Risk Assessment', desc: 'Comprehensive evaluation of potential threats' },
              { step: '03', title: 'Custom Solution', desc: 'Tailored security package for your budget' },
              { step: '04', title: 'Implementation', desc: 'Professional deployment and ongoing support' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-navy-light font-heading font-semibold"
            >
              <Link to="/contact">
                Request a Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Services;
