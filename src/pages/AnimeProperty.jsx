import { useState, useEffect } from 'react';
import GetAnimeProperties from '../apis/GetAnimeProperties';
import Navbar from '../components/navbar';
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import { Play } from 'lucide-react';

const AnimeProperties = () => {
  const [animeProperties, setAnimeProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("genre");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchData = async () => {
      try {
        const data = await GetAnimeProperties(type);
        setAnimeProperties(data);
      } catch (error) {
        console.error("Failed to fetch anime list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            Anime Type
          </h2>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0065F8] transition-all"
          >
            <option value="genre">Genre</option>
            <option value="season">Season</option>
            <option value="studio">Studio</option>
            <option value="type">Type</option>
            <option value="source">Source</option>
            <option value="country">Country</option>
          </select>
        </div>

        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map(section => (
              <div key={section} className="space-y-4">
                <div className="bg-gray-800 h-8 w-32 rounded animate-pulse"></div>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-gray-800 h-16 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {animeProperties.map((anime) => (
                <div
                  className="group bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-all shadow-lg hover:shadow-2xl border border-gray-800 hover:border-[#0065F8]"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium text-sm group-hover:text-[#0065F8] transition-colors line-clamp-2 pr-2">
                      {anime.name}
                    </h3>
                    <Link to={`/property/${type}/${anime.propertiesId}`}>
                      <button className="opacity-0 group-hover:opacity-100 bg-[#0065F8] hover:bg-[#4300FF] text-white p-2 rounded-full transition-all flex-shrink-0">
                        <Play className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                  <div className="w-0 group-hover:w-full h-0.5 bg-[#0065F8] transition-all duration-300 mt-3"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AnimeProperties;
