import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/context/PortfolioContext";

type Category = "all" | "wedding" | "portrait" | "commercial" | "event";

interface PortfolioItem {
  id: number;
  src: string;
  alt: string;
  category: Exclude<Category, "all">;
  aspectRatio: "square" | "portrait" | "landscape";
  title?: string;
}

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "wedding", label: "Wedding" },
  { value: "portrait", label: "Portrait" },
  { value: "commercial", label: "Commercial" },
  { value: "event", label: "Event" },
];

export const PortfolioSection = () => {
  const { activeCategory, setActiveCategory } = usePortfolio();
  const [lightboxImage, setLightboxImage] = useState<PortfolioItem | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load and categorize images properly
  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        // Dynamically import all images from portfolio folder
        const imageModules = import.meta.glob('@/assets/portfolio/*.{jpg,jpeg,png,webp}', { eager: true });
        const images = Object.values(imageModules).map((mod: any) => mod.default);
        
        // Create items with smart categorization
        const items: PortfolioItem[] = images.map((src, index) => {
          const srcString = String(src);
          const filename = srcString.toLowerCase();
          const pathParts = srcString.split('/');
          const filenameOnly = pathParts[pathParts.length - 1];
          
          // Smart categorization based on filename
          let category: Exclude<Category, "all"> = "portrait"; // default
          
          if (filename.includes('wedding') || filename.includes('bride') || filename.includes('groom') || filename.includes('marriage') || filename.includes('couple')) {
            category = "wedding";
          } else if (filename.includes('commercial') || filename.includes('product') || filename.includes('brand') || filename.includes('ad') || filename.includes('business')) {
            category = "commercial";
          } else if (filename.includes('event') || filename.includes('party') || filename.includes('celebration') || filename.includes('concert') || filename.includes('festival')) {
            category = "event";
          } else if (filename.includes('portrait') || filename.includes('face') || filename.includes('headshot') || filename.includes('person') || filename.includes('model')) {
            category = "portrait";
          }
          
          return {
            id: index + 1,
            src: srcString,
            alt: `Portfolio image ${index + 1} - ${category}`,
            category,
            aspectRatio: "portrait",
            title: `${category.charAt(0).toUpperCase() + category.slice(1)} Photography ${index + 1}`,
          };
        });
        
        setPortfolioItems(items);
      } catch (error) {
        console.error("Error loading portfolio images:", error);
        // Fallback sample data
        setPortfolioItems([
          { id: 1, src: "", alt: "Wedding Sample 1", category: "wedding", aspectRatio: "portrait", title: "Wedding Ceremony" },
          { id: 2, src: "", alt: "Wedding Sample 2", category: "wedding", aspectRatio: "portrait", title: "Bridal Portrait" },
          { id: 3, src: "", alt: "Portrait Sample 1", category: "portrait", aspectRatio: "portrait", title: "Professional Headshot" },
          { id: 4, src: "", alt: "Portrait Sample 2", category: "portrait", aspectRatio: "portrait", title: "Lifestyle Portrait" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImages();
  }, []);

  const filteredItems = activeCategory === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-card">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Portfolio
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              Selected <span className="italic text-primary">Works</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-muted-foreground">
              A curated collection of moments frozen in time—each image tells a unique story of love, beauty, and raw emotion.
            </p>
          </AnimatedSection>
        </div>

        {/* Category Filters */}
        <AnimatedSection delay={300}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-6 py-2 text-sm tracking-wide transition-all duration-300",
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground border border-border hover:border-primary/50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">Loading portfolio images...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <AnimatedSection>
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No {activeCategory !== "all" ? activeCategory : ""} images found.
                Please check back soon!
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredItems.map((item, index) => (
              <AnimatedSection key={item.id} delay={100 + index * 50}>
                <div
                  className="break-inside-avoid group cursor-pointer overflow-hidden relative"
                  onClick={() => setLightboxImage(item)}
                >
                  {item.src ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-64 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">{item.title}</span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-foreground font-heading text-lg capitalize">
                        {item.category}
                      </p>
                      {item.title && (
                        <p className="text-muted-foreground text-sm mt-1">
                          {item.title}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm mt-1">
                        View Full Size
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-10"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <div className="text-center">
            {lightboxImage.src ? (
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-w-full max-h-[70vh] object-contain animate-scale-in"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="w-64 h-64 bg-muted flex items-center justify-center">
                <span className="text-foreground">{lightboxImage.title}</span>
              </div>
            )}
            <div className="mt-4 text-foreground">
              <p className="font-heading text-xl capitalize">{lightboxImage.category}</p>
              {lightboxImage.title && (
                <p className="text-muted-foreground mt-1">{lightboxImage.title}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};