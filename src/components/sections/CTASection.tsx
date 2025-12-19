import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/_buttonShim";
import { Link } from "react-router-dom";

export const CTASection = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 leading-tight">
              Let's create something{" "}
              <span className="italic text-primary">beautiful</span> together
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Your story deserves to be told with artistry and care. Ready to begin?
            </p>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            {/* UPDATED: Link to booking page */}
            <Link to="/book">
              <Button variant="hero" size="xl">
                Book Your Session
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CTASection;