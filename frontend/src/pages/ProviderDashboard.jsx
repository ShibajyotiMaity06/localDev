import { useEffect, useState } from 'react';
import { getProviders, updateProvider, deleteProvider } from '../api/providerApi';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import CalendarAvailability from '../components/CalendarAvailability';

export default function ProviderDashboard() {
  const [provider, setProvider] = useState(null);
  const [rate, setRate] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    fetchProvider();
  }, []);

  const fetchProvider = async () => {
    const data = await getProviders({ self: true });
    setProvider(data[0]);
    setRate(data[0].hourlyRate);
    setBio(data[0].bio);
  };

  const handleSave = async () => {
    await updateProvider(provider._id, { hourlyRate: rate, bio });
    alert('Profile updated!');
  };

  const handleDelete = async () => {
    await deleteProvider(provider._id);
    alert('Provider deleted.');
  };

  if (!provider) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Provider Dashboard</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <Input label="Hourly Rate" value={rate} onChange={setRate} />
        <Input label="Bio" value={bio} onChange={setBio} />
        <CalendarAvailability calendar={provider.availability} />
        <div className="flex gap-2 mt-4">
          <Button onClick={handleSave}>Save</Button>
          <Button className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
