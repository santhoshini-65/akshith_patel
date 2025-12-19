import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/_buttonShim";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/portfolio20.jpeg";

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional wedding photography - bride silhouette at golden hour"
          className="w-full h-[120%] object-cover"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl stagger-children">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-body">
                Professional Photography
              </p>
            </div>

            <div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-foreground mb-6">
                Capturing moments,
                <br />
                <span className="italic text-primary">not poses</span>
              </h1>
            </div>

            <div>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
                Every photograph tells a story. I'm here to tell yours with authenticity, artistry, and emotion.
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => scrollToSection("#portfolio")}
                >
                  View Portfolio
                </Button>
                <Button
                  variant="hero-outline"
                  size="lg"
                  onClick={() => scrollToSection("#contact")}
                >
                  Book a Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection("#about")}
          className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <ChevronDown
            size={20}
            className="animate-float"
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;