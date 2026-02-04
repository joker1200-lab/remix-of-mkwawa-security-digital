import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/pages/Blog';

const BlogSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Show only first 3 blog posts
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
            Latest News
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Security Insights & Tips
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay informed with the latest security trends, tips, and industry news from our expert team.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden aspect-[16/10]">
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-accent font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

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
            variant="outline"
            className="font-heading font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to="/blog">
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
