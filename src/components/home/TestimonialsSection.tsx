import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';

const testimonials = [
  {
    id: 1,
    name: 'David Mwangi',
    role: 'Managing Director',
    company: 'Logistics Company',
    image: testimonial1,
    rating: 5,
    text: 'Mkwawa Security has been protecting our warehouses for over 3 years. Their professionalism and quick response time have prevented several potential security incidents. Highly recommended!',
  },
  {
    id: 2,
    name: 'Grace Mwakyusa',
    role: 'Operations Manager',
    company: 'Hotel Chain',
    image: testimonial2,
    rating: 5,
    text: 'The security team at our hotel properties has been exceptional. They maintain a professional yet approachable demeanor that our guests appreciate. Their CCTV installation was top-notch.',
  },
  {
    id: 3,
    name: 'Emmanuel Kimaro',
    role: 'Property Developer',
    company: 'Real Estate Company',
    image: testimonial3,
    rating: 5,
    text: 'We trust Mkwawa Security for all our residential developments. Their guards are well-trained, disciplined, and truly care about the safety of our residents. Outstanding service!',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-heading font-semibold text-accent uppercase tracking-wider text-sm">
            Client Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Hear from businesses and individuals who trust Mkwawa Security for their protection needs.
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-primary-foreground/10 relative"
          >
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-12 h-12 text-accent/30" />

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-accent shadow-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-grow text-center md:text-left">
                {/* Rating */}
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-lg md:text-xl leading-relaxed mb-6 italic text-primary-foreground/90">
                  "{testimonials[currentIndex].text}"
                </p>

                <div>
                  <p className="font-heading font-bold text-xl text-accent">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-primary-foreground/70">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-accent w-8' : 'bg-primary-foreground/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
