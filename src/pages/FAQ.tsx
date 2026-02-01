import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/ui/SEOHead';
import CTASection from '@/components/home/CTASection';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What areas does Mkwawa Security serve?',
        answer: 'We primarily serve Dar es Salaam, Singida, and Iringa regions in Tanzania. We are continuously expanding our coverage to other areas. Contact us to check if we serve your location.',
      },
      {
        question: 'Is Mkwawa Security a licensed security company?',
        answer: 'Yes, Mkwawa Security is a registered member of the Tanzania Private Security Industry Regulatory Authority, which operates under the Tanzania Police Force. We meet all regulatory requirements for security services in Tanzania.',
      },
      {
        question: 'How long has Mkwawa Security been in operation?',
        answer: 'Mkwawa Security has been operating since 2019, providing professional security services across Tanzania. Our management team brings extensive military and police experience to ensure the highest standards of service.',
      },
    ],
  },
  {
    category: 'Services',
    questions: [
      {
        question: 'What types of security services do you offer?',
        answer: 'We offer a comprehensive range of security services including: Armed and Unarmed Guards, Armed Response, CCTV and Alarm Systems, VIP Protection, Security Training and Consulting, Background Checks and Lie Detector Tests, Electric Fencing, and Gate Automation.',
      },
      {
        question: 'Do you provide 24/7 security coverage?',
        answer: 'Yes, we provide round-the-clock security services. Our modern control room is manned 24/7, and our armed response teams are always on standby to respond to emergencies.',
      },
      {
        question: 'Can you customize security packages for my specific needs?',
        answer: 'Absolutely! We take the time to understand your unique security needs and environment. Our security packages are designed especially for each client, taking into account specific requirements and financial capabilities.',
      },
      {
        question: 'Do you provide security for events?',
        answer: 'Yes, we provide event security services including crowd management, VIP protection, and access control. Our team can handle corporate events, private functions, and public gatherings of all sizes.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        question: 'What security systems do you install?',
        answer: 'We install a wide range of security systems including CCTV cameras, alarm systems, fingerprint readers, intercoms, electric fencing, surveillance cameras, panic systems, and gate automation. Our technicians are trained and certified to install and maintain these systems.',
      },
      {
        question: 'Do you provide monitoring services for security systems?',
        answer: 'Yes, we offer offsite monitoring services from our modern control room. All alarm activations are dealt with immediately, and our response teams are dispatched according to our policy and your specific instructions.',
      },
      {
        question: 'How do you track your response vehicles?',
        answer: 'All our vehicles are equipped with state-of-the-art GPS live tracking systems. They communicate constantly with our control room, enabling swift response to any calls for assistance.',
      },
    ],
  },
  {
    category: 'Pricing & Contracts',
    questions: [
      {
        question: 'How do I get a quote for your services?',
        answer: 'You can request a quote by calling us at +255 788 222 899, emailing info@mkwawasecurity.co.tz, or filling out the contact form on our website. We will assess your needs and provide a customized quote.',
      },
      {
        question: 'Do you offer free security assessments?',
        answer: 'Yes, we offer free security consultations where our experienced team will assess your property, identify potential vulnerabilities, and recommend appropriate security solutions tailored to your needs and budget.',
      },
      {
        question: 'What are your contract terms?',
        answer: 'We offer flexible contract terms to suit different client needs. After reviewing your requirements, we will discuss and agree on terms that work best for your situation. Contact us for specific details.',
      },
    ],
  },
];

const FAQ = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Layout>
      <SEOHead
        title="Frequently Asked Questions"
        description="Find answers to common questions about Mkwawa Security services, pricing, and coverage. Learn about our security guards, systems, and protection services in Tanzania."
        canonicalUrl="/faq"
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
              FAQ
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Find answers to common questions about our security services, coverage, 
              and how we can help protect what matters most to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-background" ref={faqRef}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-accent" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    {category.category}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-accent py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto text-center mt-16 p-8 bg-muted/50 rounded-2xl"
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our team is here to help. 
              Contact us and we'll get back to you as soon as possible.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-navy-light font-heading font-semibold"
            >
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default FAQ;
