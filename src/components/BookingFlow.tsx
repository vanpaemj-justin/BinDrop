import { useState, useEffect } from 'react';
import { packages as packageData, Package } from '../lib/packages';
import { ArrowLeft, ArrowRight, CheckCircle, CreditCard } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Use only the publishable key in frontend - secret key stays server-side
const stripePromise = loadStripe('pk_live_51TRvC51AU0U7U9qV4Kt8fKLaNuMQstwIEH0zr0C7GGIiU1oFHnXdbCBxzndHSeJeGphwp9H353D4vjNvXombMDwc00Tk3QUfGs');

interface BookingFlowProps {
  onCancel: () => void;
}

interface BookingData {
  packageId: string;
  selectedWeeks: number;
  selectedPrice: number;
  deliveryDate: string;
  pickupDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  pickupAddress: string;
}

export default function BookingFlow({ onCancel }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    packageId: '',
    selectedWeeks: 2,
    selectedPrice: 0,
    deliveryDate: '',
    pickupDate: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    pickupAddress: '',
  });

  useEffect(() => {
    // Use local packages instead of Supabase
    setPackages(packageData);
  }, []);

  const handlePackageSelect = (pkg: Package, weeks: number) => {
    const price = pkg.pricing[weeks] || 0; // rental price only, deposit charged at checkout
    setSelectedPackage(pkg);
    setBookingData({
      ...bookingData,
      packageId: pkg.id,
      selectedWeeks: weeks,
      selectedPrice: price
    });
    setStep(2);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  // Handle the actual form submission
  const handleSubmit = async () => {
    setLoading(true);

    // Submit to Formspree
    try {
      const response = await fetch('https://formspree.io/f/xlgaolqq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: `New BinDrop Booking - ${bookingData.customerName}`,
          customerName: bookingData.customerName,
          customerEmail: bookingData.customerEmail,
          customerPhone: bookingData.customerPhone,
          package: selectedPackage?.name,
          numTotes: selectedPackage?.num_totes,
          rentalWeeks: bookingData.selectedWeeks,
          price: bookingData.selectedPrice,
          deliveryDate: bookingData.deliveryDate,
          pickupDate: bookingData.pickupDate,
          deliveryAddress: bookingData.deliveryAddress,
          pickupAddress: bookingData.pickupAddress,
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      console.log('Order submitted:', bookingData);
    } catch (error) {
      console.error('Error submitting order:', error);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Redirect to Stripe payment link
    const weeks = bookingData.selectedWeeks as '2' | '4';
    const paymentLink = selectedPackage?.paymentLink?.[weeks];
    
    if (paymentLink) {
      // Store booking data in sessionStorage for reference
      sessionStorage.setItem('bindrop_booking', JSON.stringify(bookingData));
      sessionStorage.setItem('bindrop_package', JSON.stringify(selectedPackage));
      
      // Redirect to Stripe payment link
      window.location.href = paymentLink;
    } else {
      alert('Payment unavailable. Please try again.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing BinDrop! We've received your order and will contact you shortly to confirm delivery details.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Package:</span> {selectedPackage?.name} ({bookingData.selectedWeeks} weeks)</p>
              <p><span className="font-medium">Total:</span> ${bookingData.selectedPrice} <span className="text-sm text-gray-500"> + $100 refundable deposit</span></p>
              <p><span className="font-medium">Delivery Date:</span> {new Date(bookingData.deliveryDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Pickup Date:</span> {new Date(bookingData.pickupDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Delivery Address:</span> {bookingData.deliveryAddress}</p>
              <p><span className="font-medium">Pickup Address:</span> {bookingData.pickupAddress}</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold font-heading text-brand-900">
                Bin<span className="text-brand-600">Drop</span>
              </span>
              <button
                onClick={onCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      s <= step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        s < step ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Select Your Package</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`bg-white border-2 rounded-xl p-6 ${pkg.name === 'Standard' ? 'border-brand-600 relative' : 'border-gray-200'}`}
                  >
                    {pkg.name === 'Standard' && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </div>
                    )}
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                    <div className="text-gray-600 mb-4">
                      <p className="font-semibold">{pkg.num_totes} Bins</p>
                      {pkg.features && pkg.features.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {pkg.features.map((feature, idx) => (
                            <p key={idx} className="text-sm text-green-600 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {feature}
                            </p>
                          ))}
                          <p className="text-xs text-gray-400 mt-2">$100 refundable deposit required</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => handlePackageSelect(pkg, 2)}
                        className="w-full text-left bg-blue-50 border-2 border-blue-200 rounded-lg p-4 hover:border-blue-600 hover:bg-blue-100 transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-900">2 weeks</span>
                          </div>
                          <div className="text-2xl font-bold text-blue-600">
                            ${pkg.pricing['2']}
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => handlePackageSelect(pkg, 4)}
                        className="w-full text-left bg-blue-50 border-2 border-blue-200 rounded-lg p-4 hover:border-blue-600 hover:bg-blue-100 transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-900">4 weeks</span>
                          </div>
                          <div className="text-2xl font-bold text-blue-600">
                            ${pkg.pricing['4']}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Choose Dates</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.deliveryDate}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      const minDate = new Date('2026-05-19');
                      if (selectedDate < minDate) {
                        return; // Don't allow dates before May 12, 2026
                      }
                      const deliveryDate = e.target.value;
                      const pickupDate = new Date(deliveryDate);
                      pickupDate.setDate(pickupDate.getDate() + (bookingData.selectedWeeks * 7));
                      setBookingData({
                        ...bookingData,
                        deliveryDate,
                        pickupDate: pickupDate.toISOString().split('T')[0]
                      });
                    }}
                    min="2026-05-19"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date (Set to {bookingData.selectedWeeks} weeks after delivery)
                  </label>
                  <input
                    type="date"
                    value={bookingData.pickupDate}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Need custom dates? Email us at hello@bindropmoving.com
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!bookingData.deliveryDate || !bookingData.pickupDate}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Your Information & Addresses</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={bookingData.customerName}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, customerName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={bookingData.customerEmail}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, customerEmail: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={bookingData.customerPhone}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, customerPhone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    value={bookingData.deliveryAddress}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, deliveryAddress: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Street address, city, state, zip code"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Address
                  </label>
                  <textarea
                    value={bookingData.pickupAddress}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, pickupAddress: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Street address, city, state, zip code"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={
                      !bookingData.customerName ||
                      !bookingData.customerEmail ||
                      !bookingData.customerPhone ||
                      !bookingData.deliveryAddress ||
                      !bookingData.pickupAddress
                    }
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Review & Submit</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-lg mb-4">Order Details</h4>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <span className="font-medium">Package:</span> {selectedPackage?.name} - {selectedPackage?.num_totes} bins
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {bookingData.selectedWeeks} weeks
                    </div>
                    <div>
                      <span className="font-medium">Total:</span> ${bookingData.selectedPrice} 
                      <span className="text-sm text-gray-500"> + $100 refundable deposit</span>
                    </div>
                    <div>
                      <span className="font-medium">Delivery Date:</span>{' '}
                      {new Date(bookingData.deliveryDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Pickup Date:</span>{' '}
                      {new Date(bookingData.pickupDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>{bookingData.customerName}</p>
                    <p>{bookingData.customerEmail}</p>
                    <p>{bookingData.customerPhone}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-lg mb-4">Addresses</h4>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <p className="font-medium mb-1">Delivery Address:</p>
                      <p className="text-sm">{bookingData.deliveryAddress}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Pickup Address:</p>
                      <p className="text-sm">{bookingData.pickupAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{loading ? 'Processing...' : 'Proceed to Payment'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
