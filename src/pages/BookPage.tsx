import { useState, useEffect } from "react";
import { Calendar, Clock, Mail, User, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/_buttonShim";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";

// Your EmailJS Configuration for Booking
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_ip5dina',
  TEMPLATE_ID: 'template_cs3b46i', // Use existing template or create new one
  PUBLIC_KEY: 'gJnY4IeY0AhdKdQQ0',
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

const BookPage = () => {
  const location = useLocation();
  const selectedService = location.state?.service || "";
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: selectedService,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "Wedding Photography",
    "Portrait Photography", 
    "Event Photography",
    "Commercial Shoot",
    "Family Photography",
    "Engagement Session",
    "Custom Package"
  ];

  // Update service when location state changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        service: selectedService
      }));
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate date
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast({
        title: "❌ Invalid Date",
        description: "Please select a future date.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send booking email via EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,           // Changed from customer_name to from_name
          from_email: formData.email,         // Changed from customer_email to from_email
          customer_phone: formData.phone || 'Not provided',
          session_type: formData.service,
          preferred_date: formData.date,
          preferred_time: formData.time,
          message: formData.message,
          reply_to: formData.email,           // Added reply_to
          to_email: 'soulfulcapturebyakshith@gmail.com',
          date: new Date().toLocaleDateString('en-IN'),
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        }
      );

      console.log('✅ Booking email sent:', result);

      if (result.status === 200 || result.status === 201) {
        toast({
          title: "✅ Booking Request Sent!",
          description: "I'll contact you within 24 hours to confirm your session.",
        });
        
        // Reset form but keep selected service if coming from booking button
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          service: selectedService || "",
          message: "",
        });
      } else {
        throw new Error('Email failed to send');
      }
    } catch (error) {
      console.error('❌ Booking error:', error);
      toast({
        title: "❌ Booking Failed",
        description: "Please email soulfulcapturebyakshith@gmail.com directly",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-4">
              Book Your <span className="italic text-primary">Session</span>
            </h1>
            <p className="text-muted-foreground">
              Let's create something beautiful together. Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-muted-foreground">
                    <User size={16} className="mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm text-muted-foreground">
                    <Mail size={16} className="mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm text-muted-foreground">
                    <Phone size={16} className="mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    placeholder="+91 9848863666"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    Service Type *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm text-muted-foreground">
                    <Clock size={16} className="mr-2" />
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="flex items-center text-sm text-muted-foreground">
                  <MessageSquare size={16} className="mr-2" />
                  Additional Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="Tell me about your vision, location preferences, special requirements..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full md:w-auto px-8 py-3 text-lg disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending Booking Request...
                    </span>
                  ) : (
                    "Submit Booking Request"
                  )}
                </Button>
              </div>

              {/* Note */}
              <p className="text-sm text-muted-foreground pt-4 border-t border-border">
                * After submitting, you'll receive a confirmation email within 24 hours.
                A 50% deposit is required to secure your booking date.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-card border border-border rounded-xl">
              <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-medium text-foreground mb-1">Email</h3>
              <p className="text-muted-foreground">soulfulcapturebyakshith@gmail.com</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-xl">
              <Phone className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-medium text-foreground mb-1">Phone</h3>
              <p className="text-muted-foreground">+91 9848863666</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-xl">
              <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-medium text-foreground mb-1">Response Time</h3>
              <p className="text-muted-foreground">Within 24 hours</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookPage;