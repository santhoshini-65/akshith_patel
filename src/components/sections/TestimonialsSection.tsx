import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sruthi & Gowtham",
    role: "Wedding Clients",
    content: "Akshith didn't just photograph our wedding—he captured the essence of our Wedding photography. Every image brings us back to those magical moments. We've never felt more beautiful.",
  },
  {
    id: 2,
    name: "Sampath",
    role: "Birthday Event",
    content: "Working with Akshith is a masterclass in visual storytelling. His editorial work transcends photography—it's art. He sees what others miss.",
  },
  {
    id: 3,
    name: "Nikhil",
    role: "Portrait Session",
    content: "We were nervous about a family photoshoot with three kids under 10. Akshith made it feel like a fun day out, and the photos? Absolutely stunning. Real moments, real joy.",
  },
  {
    id: 4,
    name: "Chandana",
    role: "Wedding Client",
    content: "From our first call to receiving the final gallery, Akshith was professional, warm, and incredibly talented. He captured moments we didn't even know happened. Pure magic.",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-card">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Testimonials
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              Client <span className="italic text-primary">Reviews</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-muted-foreground">
              What our clients say about their photography experience
            </p>
          </AnimatedSection>
        </div>

        {/* Testimonial Carousel - NO IMAGES */}
        <AnimatedSection delay={300}>
          <div className="relative max-w-4xl mx-auto">
            {/* Quote Icon */}
            <Quote
              size={64}
              className="absolute -top-8 left-0 text-primary/20"
            />

            {/* Content - Clean design without images */}
            <div className="text-center px-8 md:px-16 py-12">
              <div
                key={currentIndex}
                className="animate-fade-in"
              >
                {/* Testimonial Text - Larger and centered */}
                <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed mb-12 font-heading italic px-4">
                  "{testimonials[currentIndex].content}"
                </p>
                
                {/* Client Info - Simple and elegant without image */}
                <div className="flex flex-col items-center justify-center">
                  {/* Decorative separator line */}
                  <div className="w-20 h-0.5 bg-primary/30 mb-6"></div>
                  
                  {/* Name and Role */}
                  <div className="text-center">
                    <p className="font-heading text-xl md:text-2xl text-foreground font-medium mb-2">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation - Improved styling */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <button
                onClick={goToPrev}
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300 rounded-full"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300 rounded-full"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Testimonial counter */}
            <div className="text-center mt-8 text-sm text-muted-foreground">
              {currentIndex + 1} / {testimonials.length}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;