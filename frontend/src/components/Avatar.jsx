export default function Avatar({ src, alt, status }) {
  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    busy: "bg-red-500",
  };
  return (
    <div className="relative">
      <img
        className="w-16 h-16 rounded-full object-cover"
        src={src}
        alt={alt}
      />
      <span
        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${statusClasses[status]}`}
      />
    </div>
  );
}
