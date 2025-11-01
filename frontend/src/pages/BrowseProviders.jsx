import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProviders } from "../api/providerApi";
import RatingStars from "../components/RatingStars";

export default function BrowseProviders() {
  const [providers, setProviders] = useState([]);
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProviders(profession ? { profession } : {});
        setProviders(data || []);
      } catch (err) {
        console.error("Error fetching providers:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [profession]);

  if (loading) return <div className="p-8 text-gray-500">Loading providers...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Browse Local Service Providers
      </h1>

      {/* Filter Bar */}
      <div className="flex gap-3 mb-6">
        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All Professions</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Electrician">Electrician</option>
          <option value="Mechanic">Mechanic</option>
          <option value="Plumber">Plumber</option>
          <option value="Painter">Painter</option>
        </select>
      </div>

      {/* Providers Grid */}
      {providers.length === 0 ? (
        <div className="text-gray-600">No providers found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div
              key={provider._id}
              onClick={() => navigate(`/providers/${provider._id}`)}
              className="bg-white rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg transition"
            >
              <div className="flex items-center mb-3">
                <img
                  src={`https://api.dicebear.com/8.x/initials/svg?seed=${provider.name}`}
                  alt={provider.name}
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div>
                  <h2 className="font-semibold text-lg">{provider.name}</h2>
                  <p className="text-gray-500 text-sm">{provider.profession}</p>
                </div>
              </div>

              <RatingStars rating={provider.Rating || 0} />

              <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                {provider.bio || "No bio available."}
              </p>

              <div className="mt-3">
                <span className="text-teal-600 font-semibold">
                  ₹{provider.hourlyRate}/hr
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
