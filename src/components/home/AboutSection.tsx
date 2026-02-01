import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import teamImage from '@/assets/team-security.jpg';

const features = [
  'Military & Police experienced management',
  'Member of Tanzania Private Security Industry Regulatory Authority',
  'Stringent training programs for all personnel',
  'State-of-the-art GPS tracking systems',
  'Independent consultancy with unbiased advice',
  '24/7 modern secure control room',
];

const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={teamImage}
                alt="Mkwawa Security Team"
                className="w-full h-auto object-cover"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-accent text-accent-foreground px-6 py-4 rounded-lg shadow-gold">
                <p className="font-heading font-bold text-2xl">Since 2019</p>
                <p className="text-sm">Protecting Tanzania</p>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
              About Mkwawa Security
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              Tanzania's Trusted Security Partner
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Mkwawa Security is a Tanzanian company dedicated to the provision of excellent 
              security services. We are capable of dealing with all your security needs and 
              offer a complete range of planning, system analysis and design as well as 
              executive services.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our senior management has military or police experience, ensuring in-depth 
              knowledge of Tanzania's security trends and conditions. We are committed to 
              providing exceptional services with personalized, high-quality, and cost-efficient 
              solutions.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-navy-light font-heading font-semibold"
            >
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
