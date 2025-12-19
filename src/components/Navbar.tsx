import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/_buttonShim";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { usePortfolio } from "@/context/PortfolioContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Wedding", href: "#portfolio", category: "wedding" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setActiveCategory } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string, category?: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
      
      if (category) {
        setTimeout(() => {
          setActiveCategory(category as any);
        }, 300);
      }
    }
  };

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50" : "bg-transparent")}>
      <nav className="container-custom h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#home");
          }}
          className="font-heading text-2xl font-medium tracking-tight text-foreground hover:text-primary transition-colors"
        >
          AKSHITH PATEL
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href, (link as any).category);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button - UPDATED */}
        <div className="hidden lg:block">
          <Link to="/book">
            <Button variant="hero-outline" size="sm">
              Book a Session
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu - UPDATED */}
      <div
        className={cn(
          "lg:hidden absolute top-20 left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="container-custom py-6 space-y-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href, (link as any).category);
                }}
                className="block text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            {/* UPDATED: Link to booking page */}
            <Link to="/book" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="hero" className="w-full">
                Book a Session
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;