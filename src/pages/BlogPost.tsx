import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/ui/SEOHead';
import CTASection from '@/components/home/CTASection';
import { Button } from '@/components/ui/button';
import { blogPosts } from './Blog';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <SEOHead title="Post Not Found" description="The requested blog post was not found." />
        <div className="section-padding container-custom text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <Layout>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonicalUrl={`/blog/${post.slug}`}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-navy-dark opacity-90" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/70">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-2xl mb-8 shadow-lg"
              />
              <div
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-accent"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Share */}
              <div className="mt-8 pt-8 border-t border-border flex items-center gap-4">
                <span className="font-semibold text-foreground">Share this article:</span>
                <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Related Posts */}
                <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        to={`/blog/${related.slug}`}
                        className="group block"
                      >
                        <div className="flex gap-4">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                              {related.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">{related.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                  <h3 className="font-heading text-xl font-bold mb-4">
                    Need Security Services?
                  </h3>
                  <p className="text-primary-foreground/80 mb-6">
                    Contact us for a free security assessment tailored to your needs.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-accent text-accent-foreground hover:bg-gold-dark"
                  >
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default BlogPost;
