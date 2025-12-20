import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Youtube } from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Wedding Photography", href: "#services" },
    { label: "Portrait Sessions", href: "#services" },
    { label: "Fashion & Editorial", href: "#services" },
    { label: "Event Coverage", href: "#services" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/soulfulcapturebyakshith", label: "Instagram" },
  { icon: Youtube, href: "http://www.youtube.com/@AkshithPatel08", label: "YouTube" },
  { icon: Mail, href: "mailto:akshithelmala@gmail.com", label: "Email" },
];

export const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="font-heading text-2xl font-medium text-foreground"
            >
              [AKSHITH PATEL]
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              ["Transforming ordinary moments into extraordinary memories. Book your session today"]
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-primary mt-1 flex-shrink-0" />
                <a
                  href="mailto:[YOUR EMAIL]"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  [akshithelmala@gmail.com]
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-primary mt-1 flex-shrink-0" />
                <a
                  href="tel:[YOUR PHONE]"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  [+91 98488 63666]
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  [Gayatri Nagar, Nizamabad, Telangana, India]
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} [AKSHITH PATEL] Photography. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;