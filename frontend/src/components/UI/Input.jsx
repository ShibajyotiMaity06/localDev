export default function Input({ label, value, onChange, type = 'text', placeholder, className = '' }) {
  return (
    <div className={`flex flex-col mb-3 ${className}`}>
      {label && <label className="mb-1 text-sm font-semibold text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
      />
    </div>
  );
}
