import { useState, useEffect } from "react";
import { Calendar, Clock, Mail, User, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/_buttonShim";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLocation } from "react-router-dom";

const BookPage = () => {
  const location = useLocation();
  const selectedService = location.state?.service || "";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: selectedService,
    message: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert("Thank you! We'll contact you soon to confirm your booking.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      message: "",
    });
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tell me about your vision, location preferences, special requirements..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full md:w-auto px-8 py-3 text-lg"
                >
                  Submit Booking Request
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
              <p className="text-muted-foreground">akshith@example.com</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-xl">
              <Phone className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-medium text-foreground mb-1">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
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