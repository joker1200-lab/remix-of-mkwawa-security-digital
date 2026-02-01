import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/ui/SEOHead';
import { Button } from '@/components/ui/button';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';

const blogPosts = [
  {
    id: 1,
    slug: 'importance-of-professional-security-services',
    title: 'The Importance of Professional Security Services for Your Business',
    excerpt: 'In today\'s world, security threats are becoming increasingly sophisticated. Learn why professional security services are essential for protecting your business assets and employees.',
    image: portfolio1,
    author: 'Mkwawa Security Team',
    date: 'January 28, 2026',
    readTime: '5 min read',
    category: 'Business Security',
    content: `
      <p>In today's rapidly evolving security landscape, businesses face unprecedented challenges in protecting their assets, employees, and reputation. Professional security services have become not just a luxury, but a necessity for organizations of all sizes.</p>
      
      <h3>Why Professional Security Matters</h3>
      <p>Crime statistics in Tanzania have shown an increase in both residential and business robberies. Small and medium businesses are particularly vulnerable, making professional security an essential investment rather than an optional expense.</p>
      
      <h3>Benefits of Professional Security</h3>
      <ul>
        <li><strong>Trained Personnel:</strong> Professional security officers undergo rigorous training in threat assessment, conflict resolution, and emergency response.</li>
        <li><strong>24/7 Coverage:</strong> Unlike internal security measures, professional services provide round-the-clock protection.</li>
        <li><strong>Advanced Technology:</strong> Access to state-of-the-art surveillance and monitoring systems.</li>
        <li><strong>Cost-Effective:</strong> Outsourcing security is often more economical than maintaining an in-house team.</li>
      </ul>
      
      <h3>Choosing the Right Security Partner</h3>
      <p>When selecting a security provider, look for companies with proven experience, proper licensing, and a track record of reliability. Mkwawa Security, as a member of the Tanzania Private Security Industry Regulatory Authority, meets all regulatory requirements and exceeds industry standards.</p>
    `,
  },
  {
    id: 2,
    slug: 'cctv-systems-guide-for-businesses',
    title: 'A Complete Guide to CCTV Systems for Tanzanian Businesses',
    excerpt: 'CCTV systems are a crucial component of modern security infrastructure. This guide covers everything you need to know about implementing an effective surveillance system.',
    image: portfolio2,
    author: 'Mkwawa Security Team',
    date: 'January 25, 2026',
    readTime: '7 min read',
    category: 'Security Systems',
    content: `
      <p>Closed-circuit television (CCTV) systems have become an indispensable part of comprehensive security strategies. Whether you're protecting a small retail store or a large corporate complex, the right CCTV system can make all the difference.</p>
      
      <h3>Types of CCTV Cameras</h3>
      <ul>
        <li><strong>Dome Cameras:</strong> Discrete and vandal-resistant, ideal for indoor use.</li>
        <li><strong>Bullet Cameras:</strong> Long-range visibility, perfect for outdoor monitoring.</li>
        <li><strong>PTZ Cameras:</strong> Pan-tilt-zoom capabilities for comprehensive coverage.</li>
        <li><strong>IP Cameras:</strong> Network-connected for remote monitoring and high resolution.</li>
      </ul>
      
      <h3>Key Features to Consider</h3>
      <p>Modern CCTV systems offer features like night vision, motion detection, facial recognition, and cloud storage. Our technical team at Mkwawa Security can assess your property and recommend the optimal configuration for your needs.</p>
      
      <h3>Installation and Maintenance</h3>
      <p>Professional installation ensures optimal camera placement, proper wiring, and system integration. Regular maintenance, including cleaning lenses and checking connections, keeps your system functioning at peak performance.</p>
    `,
  },
  {
    id: 3,
    slug: 'vip-protection-services-what-to-expect',
    title: 'VIP Protection Services: What Executives Should Expect',
    excerpt: 'Executive protection goes beyond having a bodyguard. Learn about the comprehensive approach to VIP security and what to look for in a protection service.',
    image: portfolio3,
    author: 'Mkwawa Security Team',
    date: 'January 20, 2026',
    readTime: '6 min read',
    category: 'VIP Protection',
    content: `
      <p>VIP protection, also known as executive protection, is a specialized security service designed to safeguard high-profile individuals from potential threats. This comprehensive service goes far beyond the traditional image of a bodyguard.</p>
      
      <h3>Components of VIP Protection</h3>
      <ul>
        <li><strong>Threat Assessment:</strong> Thorough analysis of potential risks specific to the individual.</li>
        <li><strong>Advance Work:</strong> Scouting locations and planning secure routes before any event or travel.</li>
        <li><strong>Close Protection:</strong> Trained officers providing immediate physical security.</li>
        <li><strong>Secure Transportation:</strong> Armored vehicles and trained drivers for safe travel.</li>
      </ul>
      
      <h3>Who Needs VIP Protection?</h3>
      <p>Executives, politicians, celebrities, and high-net-worth individuals often require VIP protection. However, anyone facing elevated security risks—whether due to their profession, public profile, or temporary circumstances—can benefit from these services.</p>
      
      <h3>Working with Protection Professionals</h3>
      <p>Effective protection requires trust and communication between the client and security team. Our VIP protection officers are trained to be discrete yet vigilant, adapting their approach to your lifestyle while maintaining the highest security standards.</p>
    `,
  },
  {
    id: 4,
    slug: 'security-training-importance-for-guards',
    title: 'Why Proper Training Makes the Difference in Security Services',
    excerpt: 'The quality of security services directly correlates with the training of security personnel. Discover how Mkwawa Security maintains the highest training standards.',
    image: portfolio4,
    author: 'Mkwawa Security Team',
    date: 'January 15, 2026',
    readTime: '5 min read',
    category: 'Training',
    content: `
      <p>In the security industry, the difference between adequate and exceptional service often comes down to training. At Mkwawa Security, we implement stringent training programs for our entire force that go above and beyond average industry standards.</p>
      
      <h3>Our Training Programs</h3>
      <ul>
        <li><strong>Basic Security Training:</strong> Fundamentals of guarding, patrol procedures, and emergency response.</li>
        <li><strong>Advanced Tactical Training:</strong> For armed response officers and VIP protection specialists.</li>
        <li><strong>Technical Training:</strong> Operation of surveillance systems, alarm monitoring, and technology.</li>
        <li><strong>Customer Service:</strong> Professional interaction with clients and the public.</li>
      </ul>
      
      <h3>Military and Police Experience</h3>
      <p>Our senior management team brings either military or police experience to Mkwawa Security. This expertise is passed on to our personnel, ensuring they have an in-depth understanding of security trends and conditions in Tanzania.</p>
      
      <h3>Continuous Improvement</h3>
      <p>Security threats evolve, and so does our training. We regularly update our programs to address emerging risks and incorporate new technologies, ensuring our team remains at the forefront of the security industry.</p>
    `,
  },
];

const Blog = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [postsRef, postsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Layout>
      <SEOHead
        title="Blog"
        description="Security insights, tips, and industry news from Mkwawa Security. Learn about professional security services, CCTV systems, VIP protection, and more."
        canonicalUrl="/blog"
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
              Our Blog
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Security Insights & News
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Stay informed with the latest security tips, industry trends, and expert advice 
              from the Mkwawa Security team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-background" ref={postsRef}>
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={postsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-all duration-300"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-accent font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest security tips and industry news delivered to your inbox.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-navy-light font-heading font-semibold"
            >
              <Link to="/contact">
                Contact Us for Updates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

export { blogPosts };
