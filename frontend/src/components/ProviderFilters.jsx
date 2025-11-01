import Input from './UI/Input';
import Button from './UI/Button';
import { useState } from 'react';

export default function ProviderFilters({ onFilter }) {
  const [profession, setProfession] = useState('');
  const [status, setStatus] = useState('');

  const handleApply = () => {
    onFilter({ profession, status });
  };

  return (
    <div className="flex gap-3 flex-wrap bg-white p-4 rounded-xl shadow mb-4">
      <Input label="Profession" value={profession} onChange={setProfession} placeholder="Carpenter..." />
      <Input label="Status" value={status} onChange={setStatus} placeholder="Available / Busy" />
      <div className="flex items-end">
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </div>
  );
}
