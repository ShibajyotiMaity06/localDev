import RatingStars from './RatingStars';
import Button from './UI/Button';

export default function ProviderCard({ provider, onBook }) {
  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-md transition bg-white flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{provider.name}</h3>
          <span className="text-sm text-gray-500">{provider.profession}</span>
        </div>
        <p className="text-gray-600 mt-1 text-sm">{provider.bio || 'No bio provided.'}</p>
        <div className="mt-2 flex items-center justify-between">
          <RatingStars rating={provider.rating || 0} />
          <span className="text-blue-600 font-semibold">₹{provider.hourlyRate}/hr</span>
        </div>
      </div>
      <div className="mt-3">
        <Button onClick={() => onBook(provider)}>Book Now</Button>
      </div>
    </div>
  );
}
