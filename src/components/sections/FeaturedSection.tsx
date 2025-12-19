import { AnimatedSection } from "@/components/AnimatedSection";
import wedding1 from "@/assets/wedding1.jpeg";
import wedding2 from "@/assets/wedding2.jpeg";
import portrait1 from "@/assets/portrait1.jpeg";

const featuredWorks = [
  {
    id: 1,
    title: "Traditional Elegance",
    category: "Wedding",
    description: "A beautiful celebration of tradition and love. Every detail captured with artistry and emotion, preserving precious moments forever.",
    image: wedding1,
  },
  {
    id: 2,
    title: "Sacred Moments",
    category: "Wedding",
    description: "Capturing the joy and beauty of ceremonial traditions. Each frame tells a story of love, family, and celebration.",
    image: wedding2,
  },
  {
    id: 3,
    title: "Light & Shadow",
    category: "Bridal Portrait",
    description: "A dramatic exploration of light creating stunning bridal portraits. Artistic composition meets timeless elegance.",
    image: portrait1,
  },
];

export const FeaturedSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Featured
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              Highlight <span className="italic text-primary">Projects</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-muted-foreground">
              A deeper look into some of my most cherished projects—each one a unique journey.
            </p>
          </AnimatedSection>
        </div>

        {/* Featured Works */}
        <div className="space-y-24">
          {featuredWorks.map((work, index) => (
            <AnimatedSection key={work.id} delay={200}>
              <article
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative overflow-hidden group">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">
                    {work.category}
                  </p>
                  <h3 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-6">
                    {work.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {work.description}
                  </p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
