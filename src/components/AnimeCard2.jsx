import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Play } from "lucide-react";

const AnimeCard2 = ({ anime, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={`/anime/${anime.animeCode}/${anime.animeId}`}>
            <div
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="overflow-hidden rounded-lg shadow-lg bg-gray-900">

                    <div className="relative overflow-hidden rounded-t-lg">
                        <img
                            src={anime.image}
                            alt={anime.title}
                            className="w-full h-[320px] md:h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-colors">
                                <Play className="w-8 h-8" />
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="text-white font-semibold text-sm md:text-base line-clamp-1 group-hover:text-[#0065F8] transition-colors">
                            {anime.title}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2 text-xs md:text-sm">
                            {anime?.episode && (
                                <span className="bg-[#4300FF] text-white px-2 py-1 rounded font-semibold">
                                    {anime.episode}
                                </span>
                            )}

                            {(anime?.score && anime.score.trim() !== "") || anime?.ratings ? (
                                <span className="bg-black/70 text-white px-2 py-1 rounded flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    {anime?.score && anime.score.trim() !== "" ? anime.score : anime?.ratings}
                                </span>
                            ) : null}

                            {anime?.type && (
                                <span className="bg-white/20 text-white px-2 py-1 rounded font-semibold">
                                    {anime.type}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AnimeCard2;
