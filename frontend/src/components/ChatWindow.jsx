import { useEffect, useState } from 'react';
import { getProviders } from '../api/providerApi';
import ProviderCard from '../components/ProviderCard';
import ProviderFilters from '../components/ProviderFilters';
import BookingModal from '../components/BookingModal';
import { createBooking } from '../api/bookingApi';

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async (filters = {}) => {
    const data = await getProviders(filters);
    setProviders(data);
  };

  const handleBook = (provider) => {
    setSelectedProvider(provider);
    setBookingOpen(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    await createBooking(bookingData);
    setBookingOpen(false);
    alert('Booking confirmed!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Browse Providers</h1>
      <ProviderFilters onFilter={fetchProviders} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers.map((p) => (
          <ProviderCard key={p._id} provider={p} onBook={handleBook} />
        ))}
      </div>
      {selectedProvider && (
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          provider={selectedProvider}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}
