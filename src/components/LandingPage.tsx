import { useEffect, useState } from 'react';
import { Package as PackageType } from '../lib/database.types';
import { supabase } from '../lib/supabase';
import { Phone, MapPin, CheckCircle, ChevronDown, Truck, Package, UserX } from 'lucide-react';

interface LandingPageProps {
  onStartBooking: () => void;
  onAdminClick?: () => void;
}

export default function LandingPage({ onStartBooking, onAdminClick }: LandingPageProps) {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('price', { ascending: true });

    if (error) {
      console.error('Error loading packages:', error);
    } else {
      setPackages(data || []);
    }
    setLoading(false);
  };

  const faqs = [
    {
      question: 'What are Moving Bins or What is BinDrop?',
      answer: "BinDrop makes moving simple. We deliver durable, reusable moving bins (aka moving totes, crates, boxes, etc) right to your door! This way, you can skip the cardboard, broken boxes, tape, and extra trips for packaging at the worst times. When you're done, we pick everything up. No mess, no waste, no hassle. It's just an easier way to move."
    },
    {
      question: 'How do delivery and pickup work?',
      answer: "We deliver clean, reusable moving bins and a dolly to your preferred address at your scheduled delivery time. After your move is complete, we pick everything up from your chosen location."
    },
    {
      question: 'What if I need the bins longer than 4 weeks?',
      answer: 'Email us for custom pricing.'
    },
    {
      question: 'Do I need to clean the bins before pickup?',
      answer: 'Please just remove any trash or personal items from your bins before we pick up. Damaged or destroyed bins will incur an additional service charge.'
    },
    {
      question: 'What areas do you deliver to?',
      answer: "We're currently serving the greater Grand Rapids, Michigan area – Grand Rapids + 50 miles including areas in Kent, Ottawa, Allegan, Barry, Ionia, Newaygo, Montcalm, and Muskegon counties."
    },
    {
      question: 'How big are the bins?',
      answer: 'Our bins are 25" x 15" x 11" and hold 17 gallons. Roomy enough for books, kitchen items, and everyday household goods, yet easy enough to stack and carry (or wheel on our included dolly!)'
    },
    {
      question: 'How far in advance do I need to book?',
      answer: "Booking ahead ensures we have your totes ready and waiting. Rentals of 20–40 totes can be reserved as little as 48 hours before your delivery date (based on availability), while orders of 55 or more totes require a minimum of 4 days' notice. If your move date is flexible, we recommend booking as soon as you know it. Once received, we'll confirm your order with you as soon possible."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="/BinDrop_storage_logo_design.png"
                alt="BinDrop Logo"
                className="h-16 w-auto"
              />
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="font-medium">586-436-0315</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Grand Rapids, MI + 50 miles</span>
              </div>
            </div>
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="mb-12 flex justify-center">
          <img
            src="/BinDrop_storage_logo_design.png"
            alt="BinDrop Logo"
            className="h-48 w-auto"
          />
        </div>
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Moving Made Simple with Reusable Bins
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Skip the cardboard boxes. BinDrop delivers sturdy, stackable moving bins right to your door.
          Pack at your pace, move with ease, and we'll pick them up when you're done.
        </p>
        <button
          onClick={onStartBooking}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Book Your Bins Now
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <Truck className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">We Deliver</h3>
            <p className="text-gray-600">Bins delivered to your door on your schedule</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">You Pack & Move</h3>
            <p className="text-gray-600">Keep bins for 2-4 weeks to pack at your pace</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <UserX className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">We Pick Up</h3>
            <p className="text-gray-600">We collect empty bins from your new place</p>
          </div>
        </div>

        <h3 className="text-3xl font-bold text-center mb-12">Choose Your Package</h3>

        {loading ? (
          <div className="text-center py-12">Loading packages...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border-2 border-gray-100 hover:border-blue-500"
              >
                <h4 className="text-2xl font-bold text-gray-900 mb-3">{pkg.name}</h4>
                <div className="text-gray-600 mb-6">
                  <p className="text-lg font-semibold">{pkg.num_totes} Bins</p>
                  {pkg.features && pkg.features.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {pkg.features.map((feature, idx) => (
                        <p key={idx} className="text-sm text-green-600 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Includes {feature}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-3 mb-6">
                  {Object.entries(pkg.duration_options || {}).map(([key, option]) => (
                    <div key={key} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{option.weeks} weeks</span>
                        <span className="text-xl font-bold text-blue-600">${option.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onStartBooking}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-50 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose BinDrop?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-2">Convenient</h4>
              <p className="text-gray-600">No assembly, taping, or shopping required</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Durable & Secure</h4>
              <p className="text-gray-600">Heavy-duty bins with attached lids</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Time-Saving</h4>
              <p className="text-gray-600">Delivered and picked up on your schedule</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Eco-Friendly</h4>
              <p className="text-gray-600">Reusable bins reduce cardboard waste</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openFaqIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-2">© 2024 BinDrop. All rights reserved.</p>
          <p className="text-gray-400">Serving Grand Rapids, MI and surrounding areas (50+ miles)</p>
        </div>
      </footer>
    </div>
  );
}
