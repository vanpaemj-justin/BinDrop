import { useEffect, useState } from 'react';
import { Package as PackageType } from '../lib/database.types';
import { supabase } from '../lib/supabase';
import { Phone, MapPin, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onStartBooking: () => void;
  onAdminClick?: () => void;
}

export default function LandingPage({ onStartBooking, onAdminClick }: LandingPageProps) {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BD</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BinDrop</h1>
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
                Admin
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Moving Made Simple with Reusable Bins
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Skip the cardboard boxes. BinDrop delivers sturdy, eco-friendly moving bins right to your door.
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
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">We Deliver</h3>
            <p className="text-gray-600">Bins delivered to your door on your schedule</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">You Pack & Move</h3>
            <p className="text-gray-600">Keep bins for 2-4 weeks to pack at your pace</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600" />
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
              <h4 className="font-semibold text-lg mb-2">Eco-Friendly</h4>
              <p className="text-gray-600">Reusable bins reduce cardboard waste</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Durable & Secure</h4>
              <p className="text-gray-600">Heavy-duty bins with attached lids</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Convenient</h4>
              <p className="text-gray-600">No assembly, taping, or shopping required</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Time-Saving</h4>
              <p className="text-gray-600">Delivered and picked up on your schedule</p>
            </div>
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
