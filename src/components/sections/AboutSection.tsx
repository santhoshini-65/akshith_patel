import { AnimatedSection } from "@/components/AnimatedSection";
import { Camera, Award, Heart, Users } from "lucide-react";

const stats = [{
  icon: Camera,
  value: "2+",
  label: "Years Experience"
}, {
  icon: Heart,
  value: "50+",
  label: "Happy Couples"
}, {
  icon: Users,
  value: "200+",
  label: "Sessions Completed"
}, {
  icon: Award,
  value: "1+",
  label: "Awards Won"
}];
export const AboutSection = () => {
  return <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <AnimatedSection delay={200}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img alt="Akshith patel - Professional Photographer" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src="/lovable-uploads/akhi.jpeg" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-primary/30 -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border border-primary/30 -z-10" />
            </div>
          </AnimatedSection>

          {/* Content */}
          <div>
            <AnimatedSection delay={100}>
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
                About Me
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
                Hello, I'm{" "}
                <span className="italic text-primary"> AKSHITH PATEL</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <p className="text-muted-foreground leading-relaxed mb-6">I began photography by capturing ordinary moments that felt extraordinary. What started as curiosity soon became passion the day I realized a single frame could tell a complete story. Since then, I chase light, emotion, and honest moments.
            </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Over time, I've photographed people, places, and emotions in their most honest form. I'm drawn to quiet details, natural expressions, and moments that don't ask to be posed.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <p className="text-muted-foreground leading-relaxed mb-10">My philosophy is simple: keep it real, keep it timeless. I work with a documentary approach, letting moments unfold naturally so every image feels genuine, personal, and lasting.<span className="text-foreground font-medium"></span>
              </p>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={600}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map(stat => <div key={stat.label} className="text-center md:text-left">
                    <stat.icon size={24} className="text-primary mb-3 mx-auto md:mx-0" />
                    <div className="font-heading text-3xl font-medium text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>)}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>;
};