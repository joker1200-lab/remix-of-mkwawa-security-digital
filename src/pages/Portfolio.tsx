import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/ui/SEOHead';
import CTASection from '@/components/home/CTASection';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const projects = [
  {
    image: portfolio1,
    category: 'Residential Security',
    title: 'Luxury Estate Protection',
    description: 'Comprehensive 24/7 guarding and patrol services for a high-end residential estate in Dar es Salaam.',
  },
  {
    image: portfolio2,
    category: 'Corporate Security',
    title: 'Office Building Security',
    description: 'Full security coverage including access control, CCTV monitoring, and professional guards.',
  },
  {
    image: portfolio3,
    category: 'Hospitality',
    title: 'Luxury Hotel Security',
    description: 'Guest safety services and property protection for a 5-star hotel property.',
  },
  {
    image: portfolio4,
    category: 'Industrial',
    title: 'Warehouse Protection',
    description: 'Industrial security solutions including patrol services and inventory protection.',
  },
  {
    image: portfolio5,
    category: 'VIP Protection',
    title: 'Executive Security',
    description: 'Personal protection and escort services for high-profile executives and dignitaries.',
  },
  {
    image: portfolio6,
    category: 'Retail',
    title: 'Shopping Center Security',
    description: 'Comprehensive retail security including crowd management and theft prevention.',
  },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '1000+', label: 'Trained Officers' },
  { value: '50+', label: 'Corporate Clients' },
  { value: '24/7', label: 'Security Coverage' },
];

const Portfolio = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Layout>
      <SEOHead
        title="Our Portfolio"
        description="Explore Mkwawa Security's successful projects across Tanzania - Residential, corporate, industrial, and VIP protection services showcasing our expertise."
        canonicalUrl="/portfolio"
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
              Our Portfolio
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Projects That Speak For Themselves
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Explore our successful security implementations across various sectors. 
              Client names are kept confidential for privacy and security reasons.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-accent">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-accent-foreground">
                  {stat.value}
                </p>
                <p className="text-accent-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-background" ref={projectsRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
              Featured Projects
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Our Work Across Sectors
            </h2>
            <p className="text-muted-foreground text-lg">
              Each project represents our commitment to excellence and client satisfaction. 
              We take pride in delivering tailored security solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground mt-2 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
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

export default Portfolio;
