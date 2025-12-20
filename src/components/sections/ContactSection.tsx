import { AnimatedSection } from "../ui/AnimatedSection";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Instagram, Youtube, Phone } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/soulfulcapturebyakshith", label: "Instagram" },
  { icon: Phone, href: "tel:9848863666", label: "Call Me" },
  { icon: Youtube, href: "http://www.youtube.com/@AkshithPatel08", label: "YouTube" },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });

  // ✅ NEW: Updated handleSubmit function that works with Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Inquiry Sent",
          description: "I will reach out to you shortly to discuss your vision.",
        });
        
        setFormData({ name: "", email: "", date: "", message: "" });
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
     toast({
  title: "Error",
  description: "Failed to send message. Please try again.",
  // Remove or comment out the variant line
});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Left Side: Editorial Info */}
          <div className="flex flex-col justify-between">
            <div>
              <AnimatedSection>
                <p className="text-[10px] uppercase tracking-[0.5em] text-accent mb-6 font-medium">
                  Contact
                </p>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
                  Let's create <br />
                  <span className="italic font-light opacity-80">something real.</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <p className="text-white/50 mb-12 text-lg font-light leading-relaxed max-w-md">
                  Whether it’s a wedding, a personal project, or a brand story, 
                  I’m here to capture the raw, honest moments. We shoot pre & post weddings, pre & post Birthdays, Model shoots, Portrait photography, New Born Shoots, etc..
                </p>
              </AnimatedSection>

              <div className="space-y-8">
                <AnimatedSection delay={300} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent transition-colors">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">Email Me</p>
                    <a href="mailto:akshithelmala@gmail.com" className="text-lg hover:text-accent transition-colors font-light">
                      akshithelmala@gmail.com
                    </a>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={400} className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                    <MapPin size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">Based In</p>
                    <p className="text-lg font-light">Gayatri Nagar, Nizamabad, Telangana, India</p>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Socials at bottom left */}
            <AnimatedSection delay={500} className="mt-16 pt-8 border-t border-white/5">
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} className="text-white/40 hover:text-accent transition-all uppercase text-[11px] tracking-widest">
                    {social.label}
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Side: Minimalist Form */}
          <AnimatedSection delay={300} className="relative">
            {/* ✅ CHANGED: Added action and method attributes to form tag */}
            <form 
              action="https://formspree.io/f/xwvellgk" 
              method="POST" 
              onSubmit={handleSubmit} 
              className="space-y-12"
            >
              <div className="space-y-10">
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-accent transition-colors peer placeholder-transparent"
                    placeholder="Name"
                  />
                  <label className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-white/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-accent">
                    Full Name *
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-accent transition-colors peer placeholder-transparent"
                    placeholder="Email"
                  />
                  <label className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-white/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-accent">
                    Email Address *
                  </label>
                </div>

                <div className="relative group">
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-accent transition-colors peer placeholder-transparent resize-none"
                    placeholder="Message"
                  />
                  <label className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-white/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-accent">
                    Tell me about your story...
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-5 border border-white/20 text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </form>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;