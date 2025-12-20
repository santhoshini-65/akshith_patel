import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/_buttonShim";
import { Link } from "react-router-dom";
import { Heart, Users, Calendar } from "lucide-react";

const services = [
  {
    title: "Wedding Photography",
    icon: <Heart className="w-10 h-10" />,
    description: "Capture every precious moment of your special day with artistic storytelling. From getting ready to the final dance.",
    features: [
      "Cinematic frames & candids",
      "Engagement Session Included",
      "Haldi & Sangeet Coverage",
      "Quick Album Delivery",
      "Youtube Live Stream Setup"
    ],
    
    duration: "Full Day"
  },
  {
    title: "Portrait Photography",
    icon: <Users className="w-10 h-10" />,
    description: "Professional portraits that reflect your personality and tell your unique story. Perfect for individuals, couples, or families.",
    features: [
      "Candid Photography",
      "Multiple Locations",
      "3 Outfit Changes",
      "Professionally Edited Images",
      "Digital Delivery within 2 Weeks"
    ],
    
    duration: "1-2 Hours"
  },
  {
    title: "Event Photography",
    icon: <Calendar className="w-10 h-10" />,
    description: "Document your celebrations with vibrant, candid shots that capture the energy, emotion, and joy of your special occasions.",
    features: [
      "Cinematic Videography",
      "Candid & Posed Shots",
      "Fast Turnaround (1 Week)",
      "Online Gallery",
      "Social Media Ready Images"
    ],
    
    duration: "3-4 Hours"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-card">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Services
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              My <span className="italic text-primary">Services</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-muted-foreground">
              Professional photography services crafted to capture timeless moments with authenticity and artistry.
            </p>
          </AnimatedSection>
        </div>

        {/* Services Grid - ALL BUTTONS UPDATED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={300 + index * 100}>
              <div className="bg-background p-8 rounded-2xl shadow-lg border border-border hover:border-primary/50 transition-all duration-300 group h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6 p-4 bg-primary/10 w-fit rounded-xl text-primary mx-auto group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl mb-4 text-center">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 text-center">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration Only - REMOVED "Starting Price" */}
                <div className="mb-6 text-center">
                  <div className="text-sm text-muted-foreground">
                    {service.duration}
                  </div>
                </div>

                {/* Book Now Button - UPDATED: Link to booking page */}
                <div className="mt-auto">
                  <Link to="/book" state={{ service: service.title }}>
                    <Button 
                      variant="hero" 
                      className="w-full"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA - UPDATED */}
        <AnimatedSection delay={600}>
          <div className="mt-16 text-center">
            <div className="inline-block bg-background border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="font-heading text-2xl mb-4">
                Custom Photography Packages
              </h3>
              <p className="text-muted-foreground mb-6">
                Have a specific vision or need a customized package? Let's create a photography experience tailored just for you.
              </p>
              {/* UPDATED: Link to booking page */}
              <Link to="/book">
                <Button variant="hero-outline" size="lg">
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}