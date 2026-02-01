import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Target, Eye, CheckCircle, Award, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/ui/SEOHead';
import CTASection from '@/components/home/CTASection';
import teamImage from '@/assets/team-security.jpg';

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We conduct our business with the highest ethical standards and transparency.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive to exceed expectations in every service we provide.',
  },
  {
    icon: Users,
    title: 'Professionalism',
    description: 'Our team maintains the highest level of discipline and expertise.',
  },
  {
    icon: Award,
    title: 'Reliability',
    description: 'Clients can depend on us for consistent, quality security solutions.',
  },
];

const About = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [whyRef, whyInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const reasons = [
    {
      title: 'Experience',
      description: 'Operating since 2019, we have proved ourselves time and time again in the Tanzania security industry.',
    },
    {
      title: 'Professional Technical Support',
      description: 'Our own technical department with highly trained technicians who undergo constant courses to stay current with the latest technology.',
    },
    {
      title: 'Beneficial Consultancy',
      description: 'Our experienced management provides the best and most cost-effective, objective, and impartial advice tailored to your needs.',
    },
    {
      title: 'Area-Based Coverage',
      description: 'Our vehicles are always close by, ensuring quick response times in your time of urgent assistance.',
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="About Us"
        description="Learn about Mkwawa Security Co. Ltd - Tanzania's trusted security company since 2019. Our mission, values, and experienced team dedicated to your safety."
        canonicalUrl="/about"
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
              About Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Your Safety, Our Business
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Mkwawa Security is a Tanzanian company dedicated to the provision of excellent 
              security services, protecting what matters most since 2019.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={teamImage}
                alt="Mkwawa Security Team"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Who We Are
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Mkwawa Security is capable of dealing with all your security needs and offers 
                a complete range of planning, system analysis and design as well as executive services.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our senior management has either military or police experience and this knowledge 
                is passed onto our other personnel. We have acquired an in-depth perspective of 
                Tanzania trends and conditions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mkwawa Security is committed to providing exceptional services by delivering 
                personalized, high quality and cost efficient solutions to meet the needs of our clients.
                We are a member of the Tanzania Private Security Industry Regulatory Authority.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted/50" ref={missionRef}>
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide exceptional security services by delivering personalized, high-quality, 
                and cost-efficient solutions. We strive to exceed the requests of our clients by 
                going above and beyond what is asked to ensure that every detail meets your requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading security provider in Tanzania, recognized for our excellence, 
                integrity, and commitment to protecting our clients' assets and people. We aim 
                to set the industry standard for professionalism and innovation in security services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background" ref={valuesRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
              Our Values
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-heading text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary text-primary-foreground" ref={whyRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">
              Why Mkwawa Security?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={whyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-xl font-bold mb-2">{reason.title}</h4>
                  <p className="text-primary-foreground/70">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;
