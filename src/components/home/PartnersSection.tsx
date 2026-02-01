import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const partners = [
  { name: 'Tanzania Police Force', type: 'Government Partner' },
  { name: 'Banking Institutions', type: 'Financial Sector' },
  { name: 'Hotels & Resorts', type: 'Hospitality' },
  { name: 'Manufacturing Companies', type: 'Industrial' },
  { name: 'Real Estate Developers', type: 'Property' },
  { name: 'NGOs & Embassies', type: 'International' },
];

const PartnersSection = () => {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
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
            Our Partners
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-muted-foreground text-lg">
            We work hand in hand with the Tanzanian Police Force and serve diverse sectors 
            across the country.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-xl p-6 shadow-card border border-border text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="font-heading font-bold text-2xl text-accent">
                  {partner.name.charAt(0)}
                </span>
              </div>
              <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
                {partner.name}
              </h4>
              <p className="text-xs text-muted-foreground">{partner.type}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Member of the <span className="text-foreground font-semibold">Tanzania Private Security Industry Regulatory Authority</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
