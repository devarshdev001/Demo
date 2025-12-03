import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function DashboardContact() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-orange-900 mb-2">Contact Support</h1>
        <p className="text-orange-700">Get in touch with our support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 border-orange-200">
            <h2 className="text-orange-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-orange-700 mb-2">Subject</label>
                <Input
                  placeholder="What can we help you with?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="border-orange-200"
                />
              </div>
              <div>
                <label className="block text-sm text-orange-700 mb-2">Message</label>
                <Textarea
                  placeholder="Describe your issue or question in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={8}
                  className="border-orange-200"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="p-6 border-orange-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-4 shadow-lg">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-orange-900 mb-2">Email</h3>
            <p className="text-orange-700">support@queueless.app</p>
            <p className="text-sm text-orange-600 mt-2">We'll respond within 24 hours</p>
          </Card>

          <Card className="p-6 border-orange-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-orange-900 mb-2">Phone</h3>
            <p className="text-orange-700">+1 (555) 123-4567</p>
            <p className="text-sm text-orange-600 mt-2">Mon-Fri, 9am-6pm EST</p>
          </Card>

          <Card className="p-6 border-orange-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center mb-4 shadow-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-orange-900 mb-2">Office</h3>
            <p className="text-orange-700">
              123 Restaurant Tech Blvd<br />
              San Francisco, CA 94102
            </p>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="p-6 border-orange-200 mt-6">
        <h2 className="text-orange-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-orange-900 mb-2">How do I add more tables to my plan?</h3>
            <p className="text-orange-700">You can upgrade your plan from the pricing page or contact our support team for a custom plan.</p>
          </div>
          <div>
            <h3 className="text-orange-900 mb-2">Can I customize the QR code design?</h3>
            <p className="text-orange-700">Yes, you can customize your QR codes with your logo and brand colors in the Menu QR section.</p>
          </div>
          <div>
            <h3 className="text-orange-900 mb-2">How do I integrate with my payment gateway?</h3>
            <p className="text-orange-700">We support multiple payment gateways. Contact support for integration assistance.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
