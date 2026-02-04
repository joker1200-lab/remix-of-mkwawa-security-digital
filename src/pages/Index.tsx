import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/ui/SEOHead';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PartnersSection from '@/components/home/PartnersSection';
import BlogSection from '@/components/home/BlogSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Home"
        description="Mkwawa Security Co. Ltd - Your trusted partner for professional security services in Tanzania. Armed guards, CCTV systems, VIP protection, and 24/7 armed response in Dar es Salaam."
        canonicalUrl="/"
        keywords="security company Tanzania, security guards Dar es Salaam, CCTV installation Tanzania, armed response, VIP protection, Mkwawa Security"
      />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <PartnersSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
