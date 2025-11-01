export default function CalendarAvailability({ calendar = [], onToggle }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {calendar.map((slot, idx) => (
        <div
          key={idx}
          onClick={() => onToggle && onToggle(idx)}
          className={`p-2 rounded-lg cursor-pointer border text-center ${slot.available ? 'bg-green-100' : 'bg-red-100'}`}
        >
          {slot.date} — {slot.available ? 'Available' : 'Busy'}
        </div>
      ))}
    </div>
  );
}
