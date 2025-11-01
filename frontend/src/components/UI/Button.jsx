export default function Button({ children, onClick, type = 'button', disabled, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
}
