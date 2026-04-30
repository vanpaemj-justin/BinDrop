import { useState, useEffect } from 'react';
import { packages as packageData, Package } from '../lib/packages';
import { Phone, MapPin, CheckCircle, ChevronDown, Truck, Package as PackageIcon, ArrowRight, X, Menu, Mail } from 'lucide-react';
import BookingFlow from './BookingFlow';

interface LandingPageProps {
  onStartBooking: () => void;
  onAdminClick?: () => void;
}

export default function LandingPage({ onStartBooking, onAdminClick }: LandingPageProps) {
  const [packagesData, setPackagesData] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    setPackagesData(packageData);
    setLoading(false);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const faqs = [
    {
      question: 'What are moving bins?',
      answer: "Moving bins are durable, reusable plastic containers that replace cardboard boxes. They're stackable, easy to carry, and we pick them up when you're done. No taping, no assembly, no mess."
    },
    {
      question: 'How does delivery and pickup work?',
      answer: "We deliver your bins on your scheduled date. After your move, we pick them up from your new location. It's that simple—no driving to return boxes."
    },
    {
      question: 'What if I need bins longer than 4 weeks?',
      answer: 'Contact us for extended rentals. We offer flexible terms for longer moves.'
    },
    {
      question: 'Do I need to clean the bins before pickup?',
      answer: 'Just remove personal items and any trash. We handle the cleaning—bins are sanitized between every rental.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'Grand Rapids, MI + 35 miles'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowBookingModal(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
              <BookingFlow onCancel={() => setShowBookingModal(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-heading text-brand-900">
                Bin<span className="text-brand-600">Drop</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-brand-900 font-medium">
                How It Works
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-brand-900 font-medium">
                Pricing
              </button>
              <button onClick={() => scrollToSection('realtors')} className="text-gray-600 hover:text-brand-900 font-medium">
                Realtors
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-brand-900 font-medium">
                FAQs
              </button>
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-brand-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
              >
                Check Availability
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 text-gray-600">
              How It Works
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 text-gray-600">
              Pricing
            </button>
            <button onClick={() => scrollToSection('realtors')} className="block w-full text-left py-2 text-gray-600">
              Realtors
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-gray-600">
              FAQs
            </button>
            <button 
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-brand-600 text-white px-5 py-3 rounded-lg font-semibold"
            >
              Check Availability
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-brand-900 mb-6">
            No Boxes. No Tape.<br className="hidden sm:block" /> Just Move.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            We deliver reusable moving bins to your door—and pick them up when you're done. 
            Save hours of time and skip the mess of cardboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowBookingModal(true)}
              className="bg-brand-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-700 transition-colors shadow-lg"
            >
              Check Availability
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Moving Photos Carousel */}
      <section className="py-12 bg-brand-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <img src="/moving-family.png" alt="Happy family moving" className="w-full h-64 object-cover rounded-xl shadow-lg" />
            <img src="/moving-2.png" alt="Moving boxes" className="w-full h-64 object-cover rounded-xl shadow-lg" />
            <img src="/moving-3.png" alt="Happy move" className="w-full h-64 object-cover rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-900 mb-4">
              The Easiest Move You'll Ever Make
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps. No hassle, no mess.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">1. We Drop Off</h3>
              <p className="text-gray-600">
                We deliver clean, sanitized bins and dollies to your door on your scheduled date.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <PackageIcon className="w-10 h-10 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">2. You Pack & Move</h3>
              <p className="text-gray-600">
                Stackable bins make packing easy. No tape, no assembly, no mess.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">3. We Pick Up</h3>
              <p className="text-gray-600">
                After your move, we pick up all the bins from your new location. That's it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Why BinDrop Beats Cardboard
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-eco-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-lg">No Assembly</h4>
                    <p className="text-gray-300">Just open and pack. No taping, no breaking down.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-eco-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-lg">Stackable & Durable</h4>
                    <p className="text-gray-300">Bins stack neatly and protect your belongings better than cardboard.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-eco-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-lg">Eco-Friendly</h4>
                    <p className="text-gray-300">Reusable bins mean less waste in landfills.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-eco-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-lg">Clean & Sanitized</h4>
                    <p className="text-gray-300">Every bin is cleaned and sanitized between rentals.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-brand-800 rounded-full flex items-center justify-center">
                <PackageIcon className="w-32 h-32 text-brand-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              One price covers everything—bins, delivery, pickup, and your choice of 2 weeks or 4 weeks rental
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {packagesData.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-2 ${pkg.name === 'Standard' ? 'border-brand-600 relative' : 'border-gray-100'}`}
                >
                  {pkg.name === 'Standard' && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <h4 className="text-2xl font-bold text-brand-900 mb-2">{pkg.name}</h4>
                  <p className="text-gray-500 mb-4">{pkg.description}</p>
                  <p className="text-4xl font-bold text-brand-900 mb-1 text-center">
                    ${pkg.pricing['2']}
                    <span className="text-lg font-normal text-gray-500">/2 weeks</span>
                  </p>
                  <p className="text-xs text-gray-400 mb-6 text-center">$100 refundable deposit required</p>
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <p key={idx} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle className="w-4 h-4 text-eco-500 mr-2" />
                        {feature}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
                  >
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-gray-500 mt-8">
            Need a custom quote? <a href="mailto:bindropmoving@gmail.com" className="text-brand-600 font-medium">Contact us</a>
          </p>
        </div>
      </section>

      {/* Realtors Section */}
      <section id="realtors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-900 mb-4">
                For Realtors & Property Managers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Offer your clients a premium moving experience. Purchase bins for your clients 
                and we'll handle the rest—we'll even include your branding on the delivery.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-eco-500 mr-3" />
                  Bulk pricing for realtors
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-eco-500 mr-3" />
                  Your logo on delivery paperwork
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-eco-500 mr-3" />
                  Dedicated account manager
                </li>
              </ul>
              <button className="bg-brand-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-800 transition-colors">
                Get Partner Pricing
              </button>
            </div>
            <div className="bg-brand-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏠</span>
                </div>
                <h4 className="font-semibold text-lg text-brand-900 mb-2">Moving Clients?</h4>
                <p className="text-gray-600 text-sm">
                  Give your clients the gift of an easier move. Purchase bins and we'll deliver 
                  a seamless experience they won't forget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-semibold text-brand-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Move the Easy Way?
          </h2>
          <p className="text-xl text-brand-100 mb-8">
            Check availability for your move dates today.
          </p>
          <button 
            onClick={() => setShowBookingModal(true)}
            className="bg-white text-brand-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-50 transition-colors shadow-lg"
          >
            Check Availability
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold font-heading">
                Bin<span className="text-brand-400">Drop</span>
              </span>
              <p className="mt-4 text-gray-400 text-sm">
                Making moving easier, one bin at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-white">How It Works</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white">Pricing</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-white">FAQs</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service Area</h4>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Grand Rapids, MI + 35 miles
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:bindropmoving@gmail.com" className="hover:text-white">bindropmoving@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="border-t border-brand-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 BinDrop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}