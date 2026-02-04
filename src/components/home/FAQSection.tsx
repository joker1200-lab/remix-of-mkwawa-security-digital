import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What areas does Mkwawa Security serve?',
    answer: 'We primarily serve Dar es Salaam, Singida, and Iringa regions in Tanzania. We are continuously expanding our coverage to other areas. Contact us to check if we serve your location.',
  },
  {
    question: 'Is Mkwawa Security a licensed security company?',
    answer: 'Yes, Mkwawa Security is a registered member of the Tanzania Private Security Industry Regulatory Authority, which operates under the Tanzania Police Force. We meet all regulatory requirements for security services in Tanzania.',
  },
  {
    question: 'What types of security services do you offer?',
    answer: 'We offer a comprehensive range of security services including: Armed and Unarmed Guards, Armed Response, CCTV and Alarm Systems, VIP Protection, Security Training and Consulting, Background Checks and Lie Detector Tests, Electric Fencing, and Gate Automation.',
  },
  {
    question: 'Do you provide 24/7 security coverage?',
    answer: 'Yes, we provide round-the-clock security services. Our modern control room is manned 24/7, and our armed response teams are always on standby to respond to emergencies.',
  },
  {
    question: 'How do I get a quote for your services?',
    answer: 'You can request a quote by calling us at +255 788 222 899, emailing info@mkwawasecurity.co.tz, or filling out the contact form on our website. We will assess your needs and provide a customized quote.',
  },
];

const FAQSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Find answers to common questions about our security services. Can't find what you're looking for? Contact us directly.
            </p>
            
            <div className="flex items-center gap-4 p-6 bg-muted/50 rounded-xl">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <HelpCircle className="w-7 h-7 text-accent" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground">Still have questions?</p>
                <p className="text-muted-foreground text-sm">Our team is here to help 24/7</p>
              </div>
            </div>

            <div className="mt-6">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-navy-light font-heading font-semibold"
              >
                <Link to="/faq">
                  View All FAQs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
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
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
