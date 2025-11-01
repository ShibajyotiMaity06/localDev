import { useState } from 'react';
import Input from './UI/Input';
import Button from './UI/Button';

export default function BookingModal({ isOpen, onClose, provider, onConfirm }) {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm({ providerId: provider._id, date, timeSlot, message });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Book {provider.name}</h2>
        <Input label="Date" type="date" value={date} onChange={setDate} />
        <Input label="Time Slot" value={timeSlot} onChange={setTimeSlot} placeholder="e.g. 10:00 AM - 12:00 PM" />
        <Input label="Message" value={message} onChange={setMessage} placeholder="Any special notes?" />
        <div className="flex justify-end gap-2 mt-4">
          <Button className="bg-gray-400 hover:bg-gray-500" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}
