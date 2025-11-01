import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProviderById } from '../api/providerApi';
import CalendarAvailability from '../components/CalendarAvailability';
import RatingStars from '../components/RatingStars';

export default function ProviderDetail() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getProviderById(id);
      setProvider(data);
    })();
  }, [id]);

  if (!provider) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold">{provider.name}</h1>
        <p className="text-gray-600">{provider.profession}</p>
        <div className="mt-2"><RatingStars rating={provider.rating} /></div>
        <p className="mt-4 text-gray-700">{provider.bio}</p>
        <h3 className="mt-6 font-semibold text-lg">Hourly Rate: ₹{provider.hourlyRate}</h3>
        <h3 className="mt-4 font-semibold text-lg">Availability:</h3>
        <CalendarAvailability calendar={provider.availability || []} />
      </div>
    </div>
  );
}
